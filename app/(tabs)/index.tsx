import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Dimensions } from 'react-native';

import SearchBar from '~/components/SearchBar';
export default function Home() {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#833ab4', '#fd1d1d', '#fcb045']}
        style={{ height: Dimensions.get('window').height }}>
        <SearchBar />
      </LinearGradient>
    </View>
  );
}
