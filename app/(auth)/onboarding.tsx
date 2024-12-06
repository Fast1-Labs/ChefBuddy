import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
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
    <View className="flex-1">
      <LinearGradient
        colors={['#833ab4', '#fd1d1d', '#fcb045']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: Dimensions.get('window').height,
          top: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <StatusBar style="light" />
        <Pressable onPress={handleSkip} className="absolute right-10 top-20 z-10">
          <Text className="font-bold text-white">SKIP</Text>
        </Pressable>
        <ScrollView
          onScroll={handleScroll}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}>
          {onBoardingData.map((item: onBoardingDataType, index: number) => (
            <View
              key={index}
              className="items-center justify-center"
              style={{ width: Dimensions.get('window').width }}>
              {item.image}
              <View className="gap-6 p-4">
                <Text className=" text-center text-3xl font-bold text-white">{item.title}</Text>
                <Text className=" text-center text-lg font-semibold text-gray-100">
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
