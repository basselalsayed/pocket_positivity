import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import TabBarIcon from '../components/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import TimePicker from '../components/Forms/TimePicker';
import { Button, Card, Title, TextInput } from 'react-native-paper';

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import NewMantra from '../components/Forms/NewMantra';
import Mantras from '../components/Mantras';

const MantrasScreen = (snt) => {
  const [mantras, setMantras] = useState([]);
  const [mantraInput, setMantraInput] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const getMantras = () => {
    axios
      .get('https://help-for-heroes.herokuapp.com/mantras')
      .then((response) => setMantras(response.data))
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMantras();
  }, []);

  const postMantra = () => {
    axios
      .post('https://help-for-heroes.herokuapp.com/mantras/', {
        user_id_fk: '1',
        mantra: mantraInput,
      })
      .catch((error) => {
        alert('Please try again later');
        console.error(error);
      })
      .then((response) => setMantras(response.data));
  };

  const handleSubmit = () => {
    postMantra();
    getMantras();
  };

  const handleSubmitTime = () => {};

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.flatList}
        // contentContainerStyle={styles.contentContainer}
      >
        <View>
          <TextInput
            label="Enter a new Mantra..."
            value={mantraInput}
            onChangeText={(mantraInput) => setMantraInput(mantraInput)}
          />
          <Button onPress={handleSubmit}>Submit</Button>
        </View>
        <View>
          {mantras.map((mantra) => {
            return (
              <Fragment>
                <Card key={mantra.mantra_id} style={styles.mantraContainer}>
                  <Card.Content>
                    <Title children={mantra.mantra} />

                    <TimePicker />
                    <Button onPress={() => {}} children={'Notify Me'} />
                  </Card.Content>
                </Card>
              </Fragment>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginHorizontal: 20,
    height: 20,
    justifyContent: 'center',
    padding: 5,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  mantraContainer: {
    alignItems: 'center',
    marginHorizontal: 0,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
export default MantrasScreen;
