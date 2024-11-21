import { Stack } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { Text, ScrollView } from 'react-native';

export default function Results() {
  const { suggestions } = useSearchParams();
  return (
    <ScrollView className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Results' }} />
      <Text className="mb-4 text-xl font-bold">{suggestions}</Text>
    </ScrollView>
  );
}
