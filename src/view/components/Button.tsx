import { Btn, BtnLabel } from './ButtonStyle';

type Props = {
  variant?: 'primary' | 'text';
  children: React.ReactNode;
  onPress?(): void;
  left?: React.ReactNode;
  isDisabled?: boolean;
};
export function Button({
  variant = 'primary',
  children,
  onPress,
  left,
  isDisabled,
}: Props) {
  return (
    <Btn
      onPress={onPress}
      enabled={!isDisabled}
      isTextVariant={variant === 'text'}>
      {left}
      <BtnLabel>{children}</BtnLabel>
    </Btn>
  );
}
