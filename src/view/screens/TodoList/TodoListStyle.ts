import { FlatList, RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { COLORS } from '../../Colors';
import { Todo } from '../../../domain/entities/Todo';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.surface};
  gap: 32px;
  padding: 32px 24px 0 24px;
`;

export const ListHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${COLORS.onSurface};
`;

export const List = styled(FlatList<Todo>)`
  flex: 1;
`;

export const ListItem = styled(RectButton)`
  padding: 24px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 16px 14px;
  background-color: ${COLORS.container};
  border-radius: 8px;
`;

export const ListItemLeft = styled.View`
  flex: 1;
  gap: 4px;
`;

export const ListItemTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.onSurface};
`;

export const ListItemDescription = styled.Text`
  font-size: 14px;
  color: ${COLORS.onSurfaceDim};
`;
