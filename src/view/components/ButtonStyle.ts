import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { COLORS } from '../Colors';

export const Btn = styled(RectButton)<{ isTextVariant: boolean }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;

  background-color: ${props => {
    if (props.isTextVariant) {
      return 'transparent';
    }

    return props.enabled ? COLORS.primary : COLORS.container;
  }};
  padding: 12px 16px;
  border-radius: 8px;
`;

export const BtnLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${COLORS.onSurface};
`;
