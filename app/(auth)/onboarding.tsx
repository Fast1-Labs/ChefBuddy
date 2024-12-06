import { View, FlatList, Text } from 'react-native';

import { onBoardingData, onBoardingDataType } from '~/constants/onboard';

export default function OnBoarding() {
  return (
    <View className="flex-1 items-center justify-center">
      <FlatList
        data={onBoardingData}
        renderItem={({ item }: { item: onBoardingDataType }) => (
          <View key={item.id}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
