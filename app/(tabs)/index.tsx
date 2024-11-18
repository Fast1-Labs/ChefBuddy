import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'ChefBuddy' }} />
      <Text className="p-2 text-xl font-bold">Hello there</Text>
    </View>
  );
}
