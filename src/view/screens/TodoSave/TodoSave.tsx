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

export function TodoSave({ navigation }: Props) {
  function handleExit() {
    navigation.goBack();
  }

  const { fields, submit } = useTodoSave({ goBack: handleExit });

  return (
    <Container>
      <Header>
        <Title>New To Do</Title>

        <LeaveBtn onPress={handleExit}>
          <Icon name="close" size={24} color={COLORS.onSurface} />

          <LeaveBtnText>Exit</LeaveBtnText>
        </LeaveBtn>
      </Header>

      <Form>
        <Input placeholder="Title*" onChangeText={fields.title.set} />

        <Input placeholder="Describe" onChangeText={fields.describe.set} />

        <Button isDisabled={!submit.isEnabled} onPress={submit.dispatch}>
          Create
        </Button>
      </Form>
    </Container>
  );
}
