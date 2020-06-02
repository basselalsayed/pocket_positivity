import Slider from '@react-native-community/slider';
import {Text, View, StyleSheet, Button, TextInput} from 'react-native'

import React, {useState} from 'react';




const SliderInput = () => {
  const [mood, setMood] = useState([5])
  const [shownValue, setShownValue] = useState([]) 
  const [moodComment, setMoodComment] = useState('No Comment')
  const [buttonColour, setButtonColour] = useState('#2b396b')


  return (
    <View style={styles.container}>
    <Text style={{fontSize:20, color: '#2b396b', marginBottom: 5}}>
        Welcome Back! 
    </Text>
    <Text style={{fontSize:20, color: '#2b396b', marginBottom: 30}}>
        How are you feeling?
    </Text>
    <Slider
      margin={20}
      style={{ width: 250, height: 40 }}
      value={5.5}
      handleColor={'#2b396b'}
      // handleDiameter={100}
      minimumValue={1}
      maximumValue={10}
      step={1}
      minimumTrackTintColor="#20bd3f"
      maximumTrackTintColor="#fa5534"
      onSlidingComplete={(value) => {setMood(value)}}
      onValueChange={(shownValue) => {setShownValue(shownValue)}}
      
    />
    {/* <Text>{shownValue}</Text> */}
    <Text style={styles.moodNumber}>{mood}</Text>

    <TextInput style={styles.comment} multiline={true} fontSize={20} placeholder='Any reasons or comments'
      onChangeText={(moodComment) => {setMoodComment(moodComment)}}
    />

    <Button style={styles.button}
      
      title='Log mood' 
      color={buttonColour}
      onPress={ (buttonColour) => {
        console.log(mood, moodComment);
        setButtonColour('#780e80');
      }}
      // onPress={ (buttonColour) => {setButtonColour('#780e80')}}   
    />
    <Text style={{fontSize:20, color: '#2b396b', marginTop: 30}}>
        Thank You
    </Text>
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
      fontSize: 30,
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
      // margin: 20,
      textAlign: 'center',
      borderRadius: 20,
      width: 250,
      height: 200,
      borderColor: 'grey',
      borderWidth: 1,
    },
    moodNumber: {
      margin: 10,
    },
    button: {
      paddingVertical: 20,
      // padding: 20
    }
});

export default SliderInput;
