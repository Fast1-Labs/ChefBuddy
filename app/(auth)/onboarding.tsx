import { View, Text } from 'react-native';

import { onBoardingData, onBoardingDataType } from '~/constants/onboard';

export default function OnBoarding() {
  return (
    <View className="flex-1 items-center justify-center">
      {onBoardingData.map((item: onBoardingDataType, index: number) => (
        <View key={index} className="flex-1 items-center">
          {item.image}
          <Text className="text-center text-2xl font-bold">{item.title}</Text>
          <Text className="text-center text-lg font-semibold">{item.subtitle}</Text>
        </View>
      ))}
    </View>
  );
}
