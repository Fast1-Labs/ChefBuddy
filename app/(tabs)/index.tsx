import { Stack } from 'expo-router';
import { View } from 'react-native';

import IngredientInput from '~/components/IngredientInput';

export default function Home() {
  const onAdd = () => {
    console.log('Add');
  };

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'ChefBuddy' }} />
      <IngredientInput onAdd={onAdd} />
    </View>
  );
}
