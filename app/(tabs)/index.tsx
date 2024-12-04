import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { OpenAI } from 'openai';
import { useRef, useState } from 'react';
import { View, Dimensions, TextInput, Button, Alert, ScrollView, Text } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Home() {
  const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  });
  const animation = useRef<LottieView>(null);
  const [ingredients, setIngredients] = useState<string>('');
  const [recipe, setRecipe] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  //Add language switch between  turkish / english later
  const generateRecipes = async (ingredients: string) => {
    try {
      setLoading(true);
      setRecipe(undefined);
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
        max_tokens: 700,
        temperature: 0.7,
      });
      const recipe = response.choices?.[0].message.content?.trim();
      setRecipe(recipe);
    } catch (error) {
      Alert.alert('Error while connecting to GPT.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (recipe: any) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert('You need to login to your account to add favorites.');
      }

      const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: user?.id, recipe }]);

      if (error) {
        throw error;
      }

      Alert.alert('Recipe added to favorites!');
    } catch (error) {
      console.log(error);
      Alert.alert('Error while adding to favorites!');
    }
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
        {loading && (
          <View className="flex-1 items-center justify-center">
            <LottieView
              source={require('../../assets/animations/chef.json')}
              ref={animation}
              style={{ height: 300, width: 300 }}
              loop
              autoPlay
            />
          </View>
        )}
        {recipe && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}>
            <FontAwesome
              name="star"
              size={24}
              color="white"
              onPress={() => addToFavorites(recipe)}
              className="absolute right-5 z-10"
            />
            <Text className="p-4 text-lg text-white">{recipe}</Text>
          </ScrollView>
        )}
      </LinearGradient>
    </View>
  );
}
