import { Stack } from 'expo-router';
import { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';

export default function Home() {
  const [input, setInput] = useState('');

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'ChefBuddy' }} />
      <Text className="text-l p-2 text-center font-bold">
        Please enter the ingredients you would like to use.
      </Text>
      <View className="m-2 mt-5 items-center gap-2">
        <TextInput
          placeholder="Ingredients"
          className="w-full border border-zinc-400 p-2"
          value={input}
          onChangeText={(item) => setInput(item)}
        />
        <Pressable className=" rounded bg-blue-600">
          <Text className=" m-3 font-bold text-white">Generate Recipes</Text>
        </Pressable>
      </View>
    </View>
  );
}
