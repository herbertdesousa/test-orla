import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { COLORS } from '../../Colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.surface};
  gap: 32px;
  padding: 32px 24px 0 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${COLORS.onSurface};
`;

export const DoneBtn = styled(RectButton)<{ isDone: boolean }>`
  background: ${props => (props.isDone ? COLORS.primary : COLORS.container)};
  padding: 12px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
`;

export const DoneBtnLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${COLORS.onSurface};
`;

export const DoneBtnTip = styled.Text`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${COLORS.onSurface};
`;

export const LeaveBtn = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  gap: 8px;

  padding: 12px 16px;
  border-radius: 8px;
`;

export const LeaveBtnText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${COLORS.onSurface};
`;

export const Form = styled.View`
  gap: 16px;
`;

export const Inputs = styled.View`
  gap: 8px;
`;
