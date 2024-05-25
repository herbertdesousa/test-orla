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
  WarningText,
} from './TodoListStyle';

type Props = NativeStackScreenProps<RouteStack, 'Home'>;

export function TodoList({ navigation }: Props) {
  const { todos, search, isEmpty, isFiltering } = useTaskManager(st => ({
    todos: st.todos,
    search: {
      state: st.search,
      set: st.setSearch,
      dispatch: st.fetch,
    },
    isEmpty: st.todos.length === 0,
    isFiltering: st.search.length > 0,
  }));

  function handleCreate() {
    navigation.navigate('Save');
  }

  const isFilteringAndEmpty = isFiltering && isEmpty;
  const IsEmptyWithoutFiltering = isEmpty && !isFiltering;

  return (
    <Container>
      <ListHeader>
        <Title>To do</Title>

        {!IsEmptyWithoutFiltering && (
          <Button left={<Icon name="add" size={24} />} onPress={handleCreate}>
            Create
          </Button>
        )}
      </ListHeader>

      {!IsEmptyWithoutFiltering && (
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
      )}

      {isFilteringAndEmpty && (
        <WarningText>Nenhuma busca encontrada</WarningText>
      )}

      {IsEmptyWithoutFiltering && (
        <Button left={<Icon name="add" size={24} />} onPress={handleCreate}>
          Create a new To do
        </Button>
      )}

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
