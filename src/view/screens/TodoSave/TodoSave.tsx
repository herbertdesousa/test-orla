import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Form,
  Header,
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
  const { title, fields, submit, exit } = useTodoSave(props);

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

        <Button isDisabled={!submit.isEnabled} onPress={submit.dispatch}>
          {submit.label}
        </Button>
      </Form>
    </Container>
  );
}
