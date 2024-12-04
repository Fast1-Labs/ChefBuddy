import { Redirect, Stack } from 'expo-router';

import { useAuth } from '~/context/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/auth" />;
  }
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: 'orange' } }}>
      <Stack.Screen name="index" options={{ title: 'ChefBuddy' }} />
      <Stack.Screen name="favorites" options={{ title: 'Favorites' }} />
    </Stack>
  );
}
