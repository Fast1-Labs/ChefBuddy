import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Results() {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Results' }} />
    </View>
  );
}
