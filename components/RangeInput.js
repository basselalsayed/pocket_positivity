import Slider from '@react-native-community/slider';
import {Text, View, StyleSheet, Button, TextInput} from 'react-native'

import React, {useState} from 'react';




const SliderInput = () => {
  const [mood, setMood] = useState([])
  const [shownValue, setShownValue] = useState([]) 
  const [moodComment, setMoodComment] = useState('')


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
    {/* <Text>{shownValue}</Text> */}
    <Text>{mood}</Text>
    <TextInput style={styles.comment}
      onChangeText={(moodComment) => {setMoodComment(moodComment)}}
    />
    <Button 
      onPress={ () => console.log(mood, moodComment)}
      title='Log mood'    
    />
    </View>
  ); 
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: '#fff',
    },

    title: {
      width: '100%',
      fontSize: 20,
      textAlign: 'center',
    },

    scrollView: {
      backgroundColor: 'red',
    },

    instructions: {
      textAlign: 'center',
      color: 'powderpink',  
    },

    comment: {
      width: 80,
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
    }
});

export default SliderInput;
