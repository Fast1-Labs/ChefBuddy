import { Button, TextInput, View } from 'react-native';

export default function SearchBar() {
  return (
    <View className="m-2 flex-row rounded-xl border border-gray-300 p-2">
      <TextInput
        placeholder="Enter ingredients..."
        className="m-2 flex-1 text-white"
        placeholderTextColor="gainsboro"
      />
      <Button title="Search" color="white" onPress={() => console.log('Pressed')} />
    </View>
  );
}
