import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: 'orange' } }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="results" options={{ title: 'Favorites' }} />
    </Stack>
  );
}
