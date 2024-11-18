import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'Recipe History' }} />
      <Text>History</Text>
    </View>
  );
}
