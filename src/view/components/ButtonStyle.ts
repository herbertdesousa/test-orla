import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { COLORS } from '../Colors';

export const Btn = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  gap: 8px;

  background-color: ${COLORS.primary};
  padding: 12px 16px;
  border-radius: 8px;
`;

export const BtnLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${COLORS.onSurface};
`;
