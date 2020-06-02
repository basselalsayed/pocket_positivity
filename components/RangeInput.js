import Slider from '@react-native-community/slider';
import React from 'react';

const SliderInput = () => {
  return (
    <Slider
      style={{ width: 200, height: 40 }}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
    />
  );
};
export default SliderInput;
