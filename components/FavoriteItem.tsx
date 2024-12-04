import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function FavoriteItem(favorite: any) {
  return (
    <Pressable className="flex-1 rounded-full bg-gray-400">
      <Text className="font-semibold text-white">{favorite}</Text>
    </Pressable>
  );
}
