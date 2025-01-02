import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useState, useCallback } from 'react';
import { View, Text, Alert, ScrollView, Dimensions, TextInput, Pressable } from 'react-native';

import { supabase } from '~/utils/supabase';

type Recipe = {
  recipe: string;
  id: number;
};

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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
      setFilteredFavorites(data);
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

      Alert.alert('Recipe has been removed from favorites!');
      fetchFavorites();
    } catch (error) {
      console.log(error);
      Alert.alert('Error while deleting favorite!');
    }
  };

  const filterRecipes = (query: string) => {
    setSearchQuery(query);
    const filtered = favorites.filter((item) =>
      item.recipe.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFavorites(filtered);
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
      style={{ height: Dimensions.get('window').height, flex: 1, paddingTop: 10 }}>
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
      {!loading && !favorites.length ? (
        <View className="flex-1 items-center justify-center">
          <LottieView
            source={require('../../assets/animations/loading.json')}
            loop
            autoPlay
            style={{ height: 300, width: 300 }}
          />
          <Text className="mt-4 text-lg font-semibold text-white">No Favorites Yet!</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Search recipes..."
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={filterRecipes}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: 10,
              borderRadius: 8,
              margin: 10,
              color: 'white',
            }}
          />
          <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
            {filteredFavorites.map((item) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 12,
                  marginBottom: 10,
                  padding: 10,
                }}>
                <Pressable
                  onPress={() => Alert.alert('Recipe Details', item.recipe)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ flex: 1, color: 'white', fontSize: 14, fontWeight: '600' }}>
                    {item.recipe}
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                  }}
                  onPress={() =>
                    Alert.alert('Confirm Delete', 'Remove this recipe from favorites?', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Yes', onPress: () => deleteFavorites(item.id) },
                    ])
                  }>
                  <FontAwesome name="trash" size={24} color="white" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </LinearGradient>
  );
}
