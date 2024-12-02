import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

export default function SearchBar() {
  const [ingredients, setIngredients] = useState();

  const onSearch = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="m-4 flex-row rounded-xl border border-gray-100 p-2">
      <TextInput
        value={ingredients}
        onChangeText={() => setIngredients}
        placeholder="Enter ingredients..."
        className="m-2 flex-1 text-white"
        placeholderTextColor="gainsboro"
      />
      <Button title="Search" color="white" onPress={onSearch} />
    </View>
  );
}
