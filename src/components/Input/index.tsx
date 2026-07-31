import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

type InputProps = TextInputProps & {
  onChangeText: (text: string) => void;
};

export function Input({ onChangeText, ...rest }: InputProps) {
  return (
    <TextInput
      style={styles.container}
      placeholderTextColor="#74798B"
      onChangeText={onChangeText}
      {...rest}
    />
  );
}
