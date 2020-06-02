import Slider from '@react-native-community/slider';
import {Text, View} from 'react-native'

import React, {useState} from 'react';



const SliderInput = () => {
  const [mood, setMood] = useState([])
  const [shownValue, setShownValue] = useState([]) 


  return (
    <View style={styles.container}>
    <Slider
      style={{ width: 200, height: 40 }}
      value={5}
      minimumValue={1}
      maximumValue={10}
      step={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      onSlidingComplete={(value) => {setMood(value)}}
      onValueChange={(shownValue) => {setShownValue(shownValue)}}
    />
    <Text>{shownValue}</Text>
    <Text>{mood}</Text>
    <Button onClick>

    </Button>
    </View>
  ); 
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

export default SliderInput;