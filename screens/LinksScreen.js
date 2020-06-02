import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import NewMantra from '../components/Forms/NewMantra';
import ChatBot from 'react-native-chatbot';

export default function LinksScreen() {
  const steps = [
    {
      id: 'Greet',
      message: 'Hello 🤖',
      trigger: 'Ask Name',
    },
    {
      id: 'Ask Name',
      message: 'Please type your name?',
      trigger: 'Waiting user input for name',
    },
    {
      id: 'Waiting user input for name',
      user: true,
      trigger: 'checkin',
    },
    {
      id: 'checkin',
      message: `Hi {previousValue}, How are you feeling today?`,
      trigger: 'response',
    },
    {
      id: 'response',
      options: [
        { value: 1, label: '1', trigger: '' },
        { value: 2, label: '2', trigger: '' },
        { value: 3, label: '3', trigger: '' },
        { value: 4, label: '4', trigger: '' },
        { value: 5, label: '5', trigger: '' },
        { value: 6, label: '6', trigger: '' },
        { value: 7, label: '7', trigger: '' },
        { value: 8, label: '8', trigger: '' },
        { value: 9, label: '9', trigger: '' },
        { value: 10, label: '10', trigger: '' },
      ],
    },
    {
      id: 'addmantra',
      message: `Would you like to save a new mantra?`,
      options: [
        { value: 'Yes', label: 'Yes', component: <NewMantra /> },
        { value: 'No', label: 'No', trigger: 'Done' },
      ],
    },
    {
      id: 'Done',
      message: 'Have a great day!',
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
