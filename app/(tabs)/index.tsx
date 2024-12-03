import { LinearGradient } from 'expo-linear-gradient';
import { OpenAI } from 'openai';
import { useState } from 'react';
import { View, Dimensions, TextInput, Button } from 'react-native';

export default function Home() {
  const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  });

  const [ingredients, setIngredients] = useState('');

  const generateRecipes = async (ingredients: string) => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a culinary assistant. Your goal is to provide the user with a recipe that best utilizes their provided ingredients. Make the recipe easy to follow, include clear ingredient quantities, step-by-step instructions, and provide preparation and cooking times. Tailor your suggestions to be creative, practical, and enjoyable.',
        },
        {
          role: 'user',
          content: `I have the following ingredients: ${ingredients}. Can you suggest a recipe I can prepare? Include a recipe name, picture, ingredients with quantities, and step by step cooking instructions. Please also mention the preparation and cooking time.`,
        },
      ],
    });
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#833ab4', '#fd1d1d', '#fcb045']}
        style={{ height: Dimensions.get('window').height }}>
        <View className="m-4 flex-row rounded-xl border border-gray-100 p-2">
          <TextInput
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="Enter ingredients..."
            className="m-2 flex-1 text-white"
            placeholderTextColor="gainsboro"
          />
          <Button title="Search" color="white" onPress={() => generateRecipes(ingredients)} />
        </View>
      </LinearGradient>
    </View>
  );
}
