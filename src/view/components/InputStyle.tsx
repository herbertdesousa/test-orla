import styled from 'styled-components/native';
import { COLORS } from '../Colors';

export const Container = styled.TextInput`
  padding: 16px;
  border-width: 1px;
  border-color: ${COLORS.onSurfaceDim};
  border-radius: 2px;
  font-size: 18px;
  color: ${COLORS.onSurface};
`;
