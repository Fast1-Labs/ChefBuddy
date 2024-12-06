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
import { scale, verticalScale } from 'react-native-size-matters';

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
                <Text className=" text-center text-xl font-semibold text-gray-200">
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            bottom: verticalScale(70),
            position: 'absolute',
            gap: scale(8),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {onBoardingData.map((_, index) => (
            <View
              key={index}
              style={[
                {
                  width: scale(8),
                  height: scale(8),
                  borderRadius: 1000,
                  backgroundColor: '#fff',
                  marginHorizontal: scale(2),
                },
                { opacity: activeIndex === index ? 1 : 0.3 },
              ]}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}
