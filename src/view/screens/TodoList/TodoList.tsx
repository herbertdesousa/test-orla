import {
  Container,
  List,
  ListHeader,
  ListItem,
  ListItemDescription,
  ListItemLeft,
  ListItemTitle,
  Title,
} from './TodoListStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTodoList } from './useTodoList';
import { Button } from '../../components/Button';
import { COLORS } from '../../Colors';
import { RouteStack } from '../Router';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RouteStack, 'Home'>;

export function TodoList({ navigation }: Props) {
  const { todos } = useTodoList();

  function handleCreate() {
    navigation.navigate('Save');
  }

  return (
    <Container>
      <ListHeader>
        <Title>To do</Title>

        <Button left={<Icon name="add" size={24} />} onPress={handleCreate}>
          Create
        </Button>
      </ListHeader>

      <List
        data={todos.get}
        keyExtractor={item => item.id}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => {
              navigation.navigate('Save', {
                id: item.id,
                title: item.title,
                describe: item.describe,
                isDone: item.isDone,
              });
            }}>
            <ListItemLeft>
              <ListItemTitle>{item.title}</ListItemTitle>
              <ListItemDescription>{item.describe}</ListItemDescription>
            </ListItemLeft>

            {item.isDone && (
              <Icon name="check" size={24} color={COLORS.onSurface} />
            )}
          </ListItem>
        )}
      />
    </Container>
  );
}
