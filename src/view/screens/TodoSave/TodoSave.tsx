import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  DoneBtn,
  DoneBtnLabel,
  DoneBtnTip,
  Form,
  Header,
  Inputs,
  LeaveBtn,
  LeaveBtnText,
  Title,
} from './TodoSaveStyle';
import { COLORS } from '../../Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteStack } from '../Router';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useTodoSave } from './useTodoSave';

type Props = NativeStackScreenProps<RouteStack, 'Save'>;

export function TodoSave(props: Props) {
  const { title, fields, submit, exit, deleteBtn } = useTodoSave(props);

  return (
    <Container>
      <Header>
        <Title>{title}</Title>

        <LeaveBtn onPress={exit}>
          <Icon name="close" size={24} color={COLORS.onSurface} />

          <LeaveBtnText>Exit</LeaveBtnText>
        </LeaveBtn>
      </Header>

      <Form>
        <Inputs>
          <Input
            placeholder="Title*"
            onChangeText={fields.title.set}
            value={fields.title.state}
          />

          <Input
            placeholder="Describe"
            onChangeText={fields.describe.set}
            value={fields.describe.state}
          />

          {fields.done.isShowing && (
            <DoneBtn onPress={fields.done.toggle} isDone={fields.done.state}>
              <DoneBtnLabel>
                {fields.done.state ? 'Done' : 'Pending'}
              </DoneBtnLabel>

              <DoneBtnTip>
                {fields.done.state
                  ? 'Click to Undo to not Done'
                  : 'Click to Mark as Done'}
              </DoneBtnTip>
            </DoneBtn>
          )}
        </Inputs>

        <Button isDisabled={!submit.isEnabled} onPress={submit.dispatch}>
          {submit.label}
        </Button>

        {deleteBtn.isShowing && (
          <Button variant="text" onPress={deleteBtn.dispatch}>
            delete
          </Button>
        )}
      </Form>
    </Container>
  );
}
