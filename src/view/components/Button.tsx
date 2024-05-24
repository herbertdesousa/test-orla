import { Btn, BtnLabel } from './ButtonStyle';

type Props = {
  children: React.ReactNode;
  onPress?(): void;
  left?: React.ReactNode;
};
export function Button({ children, onPress, left }: Props) {
  return (
    <Btn onPress={onPress}>
      {left}
      <BtnLabel>{children}</BtnLabel>
    </Btn>
  );
}
