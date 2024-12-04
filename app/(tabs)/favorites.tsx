import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';

import FavoriteItem from '~/components/FavoriteItem';
import { supabase } from '~/utils/supabase';

type Recipe = {
  recipe: string;
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
      }

      const { data, error } = await supabase
        .from('favorites')
        .select('recipe')
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      setFavorites(data.map((item) => item.recipe));
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <LinearGradient
      colors={['#833ab4', '#fd1d1d', '#fcb045']}
      style={{ height: Dimensions.get('window').height }}>
      {loading && <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center' }} />}
      <View className="flex-1 p-4">
        <FlatList data={favorites} renderItem={({ item }) => <FavoriteItem favorite={item} />} />
      </View>
    </LinearGradient>
  );
}
