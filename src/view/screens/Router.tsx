import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoList } from './TodoList/TodoList';
import { TodoSave } from './TodoSave/TodoSave';
import { NavigationContainer } from '@react-navigation/native';

export type RouteStack = {
  Home: undefined;
  Save: undefined;
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
