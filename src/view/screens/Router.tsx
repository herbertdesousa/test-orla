import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Todo } from '../../domain/entities/Todo';
import { TodoList } from './TodoList/TodoList';
import { TodoSave } from './TodoSave/TodoSave';

export type RouteStack = {
  Home: undefined;
  Save?: Omit<Todo, 'createdAt' | 'updatedAt'>;
};

const { Navigator, Screen } = createNativeStackNavigator<RouteStack>();

export function Router() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={TodoList} />
        <Screen name="Save" component={TodoSave} />
      </Navigator>
    </NavigationContainer>
  );
}
