import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Dimensions } from 'react-native';
export default function Home() {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#001d24', '#093179', '#ffa200']}
        style={{ height: Dimensions.get('window').height }}
      />
      <Text>Hello world</Text>
    </View>
  );
}
