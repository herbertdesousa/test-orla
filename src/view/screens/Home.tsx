import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { COLORS } from '../Colors';
import { Router } from './Router';

export function Home() {
  return (
    <GestureHandlerRootView>
      <StatusBar backgroundColor={COLORS.surface} barStyle="light-content" />

      <Router />
    </GestureHandlerRootView>
  );
}
