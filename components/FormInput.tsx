import { View, TextInput, Text } from 'react-native';

export default function FormInput({
  title,
  input,
  onInputChange,
}: {
  title: string;
  input: string;
  onInputChange: () => void;
}) {
  return (
    <View className="gap-2 p-2">
      <Text className="text-lg font-semibold text-white">{title}</Text>
      <TextInput className="border-b border-gray-300" value={input} onChangeText={onInputChange} />
    </View>
  );
}
