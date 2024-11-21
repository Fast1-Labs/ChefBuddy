import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function IngredientInput({ onAdd }: { onAdd: (ingredient: string) => void }) {
  const [ingredient, setIngredient] = useState('');

  const handleAdd = () => {
    if (ingredient) {
      onAdd(ingredient);
      setIngredient('');
    }
  };

  return (
    <View className="m-5 flex-row">
      <TextInput
        className="mr-3 flex-1 border border-[#ccc] p-2"
        placeholder="Enter an ingredient"
        value={ingredient}
        onChangeText={setIngredient}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}
