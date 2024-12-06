import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  Pressable,
} from 'react-native';

import { onBoardingData, onBoardingDataType } from '~/constants/onboard';

export default function OnBoarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffSetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffSetX / event.nativeEvent.layoutMeasurement.width);
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }
  };
  const handleSkip = async () => {
    await AsyncStorage.setItem('onboarding', 'true');
    router.push('./login');
  };
  return (
    <LinearGradient
      colors={['#833ab4', '#fd1d1d', '#fcb045']}
      style={{ height: Dimensions.get('window').height }}>
      <Pressable onPress={handleSkip} className="absolute right-5 top-20 z-10">
        <Text className="font-bold text-white">SKIP</Text>
      </Pressable>
      <ScrollView onScroll={handleScroll}>
        {onBoardingData.map((item: onBoardingDataType, index: number) => (
          <View key={index} className="flex-1 items-center justify-center gap-2 p-4">
            {item.image}
            <Text className="text-center text-2xl font-bold text-white">{item.title}</Text>
            <Text className="text-center text-lg font-semibold text-gray-100">{item.subtitle}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
