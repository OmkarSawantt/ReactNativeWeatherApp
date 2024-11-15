import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = () => {
  return (
    <View className="flex-1 justify-center items-center h-full  w-screen">
      <ActivityIndicator size="large" color="#fff"  style={{ transform: [{ scale: 2 }] }}  />
    </View>
  );
};

export default Spinner;
