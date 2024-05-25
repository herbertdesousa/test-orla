import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../Colors';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useTaskManager } from '../../managers/TodoManager';
import { RouteStack } from '../Router';
import {
  Container,
  InputContainer,
  List,
  ListHeader,
  ListItem,
  ListItemDescription,
  ListItemLeft,
  ListItemTitle,
  Title,
} from './TodoListStyle';

type Props = NativeStackScreenProps<RouteStack, 'Home'>;

export function TodoList({ navigation }: Props) {
  const { todos, search } = useTaskManager(st => ({
    todos: st.todos,
    search: {
      state: st.search,
      set: st.setSearch,
      dispatch: st.fetch,
    },
  }));

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

      <InputContainer>
        <Input
          placeholder="Search by title, pending, done..."
          value={search.state}
          onChangeText={search.set}
          style={{ flex: 1 }}
        />

        <Button onPress={search.dispatch} style={{ aspectRatio: 1 }}>
          <Icon name="search" size={24} />
        </Button>
      </InputContainer>

      <List
        data={todos}
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
