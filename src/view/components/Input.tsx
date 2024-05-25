import { StyleProp, TextStyle } from 'react-native';
import { Container } from './InputStyle';

type Props = {
  onChangeText?(text: string): void;
  value?: string;
  placeholder: string;
  style?: StyleProp<TextStyle>;
};

export function Input({ placeholder, onChangeText, value, style }: Props) {
  return (
    <Container
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={style}
    />
  );
}
