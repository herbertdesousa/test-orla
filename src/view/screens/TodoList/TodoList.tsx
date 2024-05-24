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

export function TodoList() {
  const { todos } = useTodoList();

  return (
    <Container>
      <ListHeader>
        <Title>To do</Title>

        <Button
          left={<Icon name="add" size={24} />}
          onPress={() => console.log('hellow')}>
          Create
        </Button>
      </ListHeader>

      <List
        data={todos.get}
        keyExtractor={item => item.id}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <ListItem onPress={() => console.log('click')}>
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
