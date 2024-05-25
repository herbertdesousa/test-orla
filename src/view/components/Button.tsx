import { StyleProp, ViewStyle } from 'react-native';
import { Btn, BtnLabel } from './ButtonStyle';

type Props = {
  variant?: 'primary' | 'text';
  children: React.ReactNode;
  onPress?(): void;
  left?: React.ReactNode;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
};
export function Button({
  variant = 'primary',
  children,
  onPress,
  left,
  isDisabled,
  style,
}: Props) {
  return (
    <Btn
      onPress={onPress}
      enabled={!isDisabled}
      isTextVariant={variant === 'text'}
      style={style}>
      {left}
      <BtnLabel>{children}</BtnLabel>
    </Btn>
  );
}
