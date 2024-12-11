import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';

import { useAuth } from '~/context/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/onboarding" />;
  }
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: 'orange' },
        tabBarStyle: { backgroundColor: 'orange' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ChefBuddy',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chef-hat" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="star" color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={25} color={color} />,
        }}
      />
    </Tabs>
  );
}
