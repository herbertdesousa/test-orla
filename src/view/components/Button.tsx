import { Btn, BtnLabel } from './ButtonStyle';

type Props = {
  children: React.ReactNode;
  onPress?(): void;
  left?: React.ReactNode;
  isDisabled?: boolean;
};
export function Button({ children, onPress, left, isDisabled }: Props) {
  return (
    <Btn onPress={onPress} enabled={!isDisabled}>
      {left}
      <BtnLabel>{children}</BtnLabel>
    </Btn>
  );
}
