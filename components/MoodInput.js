import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Slider,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';

const MoodInput = (props) => {
  const { triggerNextStep } = props;

  const [mood, setMood] = useState(5);
  const [shownValue, setShownValue] = useState();
  const [moodComment, setMoodComment] = useState('No comment this time');
  const [buttonColour, setButtonColour] = useState('#2b396b');
  const [buttonWasPressed, setButtonWasPressed] = useState(false);
  console.log('props', props);

  const postMoodInput = () => {
    // axios
    //   .post('https://help-for-heroes.herokuapp.com/scores/2', {
    //     score: mood,
    //     comment: moodComment,
    //   })
    //   .catch((error) => {
    //     alert('Please try again later');
    //     console.error(error);
    //   });
    let nextStep = mood >= 5 ? 'happy' : 'unhappy';
    triggerNextStep(buttonWasPressed, nextStep);
    console.log('success', 'anxious-someone-to-talk-to');
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: '#2b396b', marginBottom: 5 }}>
        Welcome Back!
      </Text>
      <Text style={{ fontSize: 20, color: '#2b396b', marginBottom: 30 }}>
        How are you Feeling?
      </Text>
      <Slider
        margin={20}
        style={{ width: 250, height: 40 }}
        value={5.5}
        handleColor={'#2b396b'}
        minimumValue={1}
        maximumValue={10}
        minimumTrackTintColor="#20bd3f"
        maximumTrackTintColor="#fa5534"
        onValueChange={(shownValue) => {
          setShownValue(shownValue);
          setMood(shownValue);
        }}
      />
      <Text style={styles.moodNumber}>{Math.floor(mood)}</Text>
      <TextInput
        style={styles.comment}
        multiline={true}
        fontSize={20}
        placeholder="Any reasons or comments"
        onChangeText={(moodComment) => {
          setMoodComment(moodComment);
        }}
      />
      <Button
        style={styles.button}
        title="Log Mood"
        color={buttonColour}
        onPress={() => {
          postMoodInput();
          setButtonColour('#780e80');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    // paddingVertical: 20,
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
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
  },
  moodNumber: {
    margin: 10,
  },
  button: {
    // paddingVertical: 20,
    padding: 20,
  },
});

export default MoodInput;
