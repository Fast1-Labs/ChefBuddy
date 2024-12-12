import { View, TextInput, Text } from 'react-native';

export default function FormInput({
  title,
  input,
  onInputChange,
  placeholder,
}: {
  title: string;
  input: string;
  onInputChange: () => void;
  placeholder: string;
}) {
  return (
    <View className="flex-row gap-2 border-b border-gray-300 p-2">
      <Text className="pl-2 text-lg font-semibold text-white">{title} :</Text>
      <TextInput
        className="pl-2"
        value={input}
        onChangeText={onInputChange}
        placeholder={placeholder}
        placeholderTextColor="gainsboro"
      />
    </View>
  );
}
