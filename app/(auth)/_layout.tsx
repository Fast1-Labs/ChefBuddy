import { Redirect, Stack } from 'expo-router';

import { useAuth } from '~/context/AuthContext';

export default function LoginLayout() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{ title: 'Login', headerStyle: { backgroundColor: 'orange' } }}
      />
    </Stack>
  );
}
