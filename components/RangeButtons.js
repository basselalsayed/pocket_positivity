
import {Text, View, StyleSheet, Button, TextInput} from 'react-native'

import React, {useState} from 'react';

import {RadioButton} from 'react-native-paper';


const ButtonInput = () => {
  const [mood, setMood] = useState([5])
  const [shownValue, setShownValue] = useState([]) 
  const [moodComment, setMoodComment] = useState('No Comment')
  const [buttonColour, setButtonColour] = useState('#2b396b')
  const [checkedButton, setCheckedButton] = useState([])


  return (
    <View style={styles.container}>
    <Text style={{fontSize:20, color: '#2b396b', marginBottom: 5}}>
        Welcome Back! 
    </Text>
    <Text style={{fontSize:20, color: '#2b396b', marginBottom: 30}}>
        How are you feeling?
    </Text>
    {/* <Text>{shownValue}</Text> */}
    <RadioButton 
      value={1}
      status={checked === 'first' ? 'checked' : 'unchecked'}
      onPress={() => { setCheckedButton(checkedButton)}}
    />
    

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
      // color: 'powderpink',  
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

export default ButtonInput;
