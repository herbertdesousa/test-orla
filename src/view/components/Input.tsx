import { Container } from './InputStyle';

type Props = {
  onChangeText?(text: string): void;
  placeholder: string;
};

export function Input({ placeholder, onChangeText }: Props) {
  return (
    <Container
      placeholder={placeholder}
      onChangeText={onChangeText}
      //
      //
    />
  );
}
