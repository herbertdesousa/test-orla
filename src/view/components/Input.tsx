import { Container } from './InputStyle';

type Props = {
  onChangeText?(text: string): void;
  value?: string;
  placeholder: string;
};

export function Input({ placeholder, onChangeText, value }: Props) {
  return (
    <Container
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      //
      //
    />
  );
}
