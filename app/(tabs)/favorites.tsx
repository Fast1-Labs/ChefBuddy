import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useState, useCallback } from 'react';
import { View, Text, Alert, ScrollView, Dimensions } from 'react-native';

import { supabase } from '~/utils/supabase';

type Recipe = {
  recipe: string;
  id: number;
};
export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('favorites')
        .select('id, recipe')
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }
      setFavorites(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  };

  const deleteFavorites = async (recipeId: number) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert('You need to login before removing favorites!');
        return;
      }
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user?.id)
        .eq('id', recipeId);

      if (error) {
        throw error;
      }

      Alert.alert('Recipe has removed from favorites!');
      fetchFavorites();
    } catch (error) {
      console.log(error);
      Alert.alert('Error while deleting favorite!');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
      return () => {
        console.log('Unfocused');
      };
    }, [])
  );

  return (
    <LinearGradient
      colors={['#833ab4', '#fd1d1d', '#fcb045']}
      style={{ height: Dimensions.get('window').height, flex: 1 }}>
      {loading && (
        <View className="flex-1 items-center justify-center">
          <LottieView
            source={require('../../assets/animations/loading.json')}
            loop
            autoPlay
            style={{ height: 300, width: 300 }}
          />
        </View>
      )}
      <ScrollView className="mb-5 flex-1 p-4" showsVerticalScrollIndicator={false}>
        {favorites.map((item, index) => (
          <View className="mb-2 border-b-2 border-white" key={index}>
            <View className="absolute right-2 z-10 flex-row gap-4">
              <FontAwesome
                name="trash"
                size={24}
                color="white"
                onPress={() =>
                  Alert.alert('Confirm Delete', 'Are you sure you want to remove this favorite?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Yes', onPress: () => deleteFavorites(item.id) },
                  ])
                }
              />
            </View>
            <Text className="pb-10 pt-8 font-semibold text-white">{item.recipe}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
