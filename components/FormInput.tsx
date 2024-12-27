import { View, TextInput, Text } from 'react-native';

export default function FormInput({
  title,
  input,
  onInputChange,
  placeholder,
}: {
  title: string;
  input: string;
  onInputChange: any;
  placeholder: string;
}) {
  return (
    <View className="flex-row items-center gap-2 border-b border-gray-300 p-2">
      <Text style={{ width: 100 }} className="pl-2 text-lg font-semibold text-white">
        {title} :
      </Text>
      <TextInput
        className="pl-2"
        value={input}
        onChangeText={onInputChange}
        placeholder={placeholder}
        placeholderTextColor="white"
      />
    </View>
  );
}
