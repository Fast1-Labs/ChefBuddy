import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: 'orange' } }}>
      <Stack.Screen name="index" options={{ title: 'ChefBuddy' }} />
      <Stack.Screen name="favorites" options={{ title: 'Favorites' }} />
    </Stack>
  );
}
