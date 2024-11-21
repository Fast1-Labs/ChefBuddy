import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, View, Text } from 'react-native';

import IngredientInput from '~/components/IngredientInput';
import { fetchMealSuggestions } from '~/utils/api';

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleGenerateMeals = async () => {
    setLoading(true);
    try {
      const suggestions = await fetchMealSuggestions(ingredients);
      router.push({
        pathname: '/results',
        params: { suggestions },
      });
    } catch (error) {
      console.log('Error while fetching meals.', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-2">
      <Stack.Screen options={{ title: 'ChefBuddy' }} />
      <IngredientInput onAdd={handleAddIngredient} />
      {ingredients.map((ingredient, index) => (
        <Text key={index} className="mt-2 text-lg font-bold">
          {ingredient}
        </Text>
      ))}
      <Button title="Generate Meals" onPress={handleGenerateMeals} disabled={loading} />
    </View>
  );
}
