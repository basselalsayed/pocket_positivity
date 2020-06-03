import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import MyComponent from '../components/Forms/NewMantra';

import ChatBot from 'react-native-chatbot-expo';
import MoodInput from '../components/MoodInput';
export default function LinksScreen() {
  const steps = [
    {
      id: 'welcome',
      message: "Hello, how's it going today?",
      trigger: 'checkin',
    },
    {
      id: 'checkin',
      component: <MoodInput />,
      waitAction: true,
      trigger: 'question',
    },
    {
      id: 'question',
      message: "Would you say you've had a good day today?",
      trigger: 'questionOptions',
    },
    {
      id: 'questionOptions',
      options: [
        { value: 1, label: 'Yes', trigger: 'happy' },
        { value: 2, label: 'It could have been better', trigger: 'unhappy' },
      ],
    },
    {
      id: 'happy',
      message: 'Thats great would you like some self help tips?',
      trigger: 'happy-options',
    },
    {
      id: 'happy-options',

      options: [
        {
          value: 1,
          label: 'Yes',
          trigger: 'happy-resources',
        },
        { value: 2, label: 'No Thanks :)', trigger: 'happy-end' },
      ],
    },
    {
      id: 'happy-end',
      message:
        'Thanks for coming to talk today, looking forward to speaking soon :)',
      end: true,
    },
    {
      id: 'happy-resources',
      message:
        'Check out these self care tips from Mind UK for keeping your mood up:\nMind uk (mind.org.uk) suggest some self care tips\nSelf-care\nDoing little things to look after your wellbeing can be really important.\nIt might be:\n* getting enough sleep\n* doing something you find relaxing, like listening to music or watching your favourite film\n* doing something you enjoy, like a favourite hobby or spending time with people you love * spending time in nature, like going for a walk or visiting a local park \n* getting active by going for a run, bike ride or playing a sport you enjoy.',
      end: true,
    },
    {
      id: 'unhappy',
      message:
        "I'm sorry to hear that, which of the following best describes how you're feeling?",
      trigger: 'unhappyOptions',
    },
    {
      id: 'unhappyOptions',
      options: [
        { value: 1, label: "I'm Anxious", trigger: 'anxiousResources' },
        { value: 2, label: 'Feeling Low', trigger: 'low' },
      ],
    },
    {
      id: 'anxiousResources',
      message: 'Would you like self help resources or someone to talk to?',
      trigger: 'anxious',
    },
    {
      id: 'anxious',
      options: [
        { value: 1, label: 'Self Help', trigger: 'anxious-self-help' },
        {
          value: 2,
          label: 'Someone to talk to',
          trigger: 'anxious-someone-to-talk-to',
        },
      ],
    },
    {
      id: 'anxious-someone-to-talk-to',
      message: `Checkout Anxiety UK:  
        http://www.anxietyuk.org.uk
        Phone: 03444 775 774 (Monday to Friday, 9.30am to 10pm; Saturday to Sunday, 10am to 8pm)`,
      end: true,
    },
    {
      id: 'anxious-self-help',
      message:
        'Corona Virus induced anxiety is common check out this blog on how to cope with anxiety in these trying times-https://www.anxietyuk.org.uk/blog/covid-19-and-anxiety-part2/',
      end: true,
    },
    {
      id: 'low',
      message: 'Would you like self help resources or someone to talk to?',
      trigger: 'low-options',
    },
    {
      id: 'low-options',
      options: [
        { value: '1', label: 'Self Help', trigger: 'low-self-help' },
        {
          value: '2',
          label: 'Someone to talk to',
          trigger: 'low-someone-to-talk-to',
        },
      ],
    },
    {
      id: 'low-self-help',
      message:
        'Mind uk (mind.org.uk) suggest some self care tips\nSelf-care\nDoing little things to look after your wellbeing can be really important. It might be:\n* getting enough sleep\n* doing something you find relaxing, like listening to music or watching your favourite film\n* doing something you enjoy, like a favourite hobby or spending time with people you love\n* spending time in nature, like going for a walk or visiting a local park\n* getting active by going for a run, bike ride or playing a sport you enjoy.\nThe nhs also has some good tips that can be found here:https://www.nhs.uk/conditions/stress-anxiety-depression/feel-better-and-happy/',
      end: true,
    },
    {
      id: 'low-someone-to-talk-to',
      message:
        'Below is from NHS:\ntry talking about your feelings to a friend, family member, health professional or counsellor.\nYou could also contact Samaritans, call: 116 123 or email: jo@samaritans.org if you need someone to talk to\nBelow is from NHS:\ntry talking about your feelings to a friend, family member, health professional or counsellor.\nYou could also contact Samaritans, call: 116 123 or email: jo@samaritans.org if you need someone to talk to',
      end: true,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.contentContainer}>
        <ChatBot steps={steps} />
      </View>
    </ScrollView>
  );
}

// function OptionButton({ icon, label, onPress, isLastOption }) {
//   return (
//     <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
//       <View style={{ flexDirection: 'row' }}>
//         <View style={styles.optionIconContainer}>
//           <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
//         </View>
//         <View style={styles.optionTextContainer}>
//           <Text style={styles.optionText}>{label}</Text>
//         </View>
//       </View>
//     </RectButton>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    height: '100%',
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
