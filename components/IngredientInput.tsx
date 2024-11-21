import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function IngredientInput({ onAdd }: { onAdd: (ingredient: string) => void }) {
  const [ingredient, setIngredient] = useState();

  const handleAdd = () => {
    if (ingredient) {
      onAdd(ingredient);
      setIngredient('');
    }
  };

  return (
    <View className="flex-1">
      <TextInput
        placeholder="Enter an ingredient"
        value={ingredient}
        onChangeText={setIngredient}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}
