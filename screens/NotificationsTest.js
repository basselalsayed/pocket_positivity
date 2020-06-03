import React from 'react';
import { Text, View, Vibration, Platform } from 'react-native';
import { Notifications, Device } from 'expo';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import axios from 'axios';

export default class AppContainer extends React.Component {
  state = {
    expoPushToken: '',
    notification: {},
    mantra: '',
  };

  registerForPushNotificationsAsync = async () => {
    if (
      (Platform.OS === 'android' || Platform.OS === 'ios') &&
      Constants.isDevice
    ) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token, 'this is the token');
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this.callMantras();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  callMantras = async () => {
    const mantra = await axios
      .get('https://help-for-heroes.herokuapp.com/mantras')
      .then((response) => {
        return response.data;
      });

    this.setState({ mantra: mantra });
  };

  setNotificationTimerHour = () => {
    Notifications.scheduleLocalNotificationAsync(
      { title: 'the title', body: this.filterMantra(this.state.mantra) },
      { time: new Date().getTime() + 3600000, repeat: 'hour' }
    );
  };

  setNotificationTimerDay = () => {
    Notifications.scheduleLocalNotificationAsync(
      { title: 'the title', body: this.filterMantra(this.state.mantra) },
      { time: new Date().getTime() + 86400000, repeat: 'day' }
    );
  };

  cancelNotificationTimers = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
  };

  _handleNotification = (notification) => {
    Vibration.vibrate();
    console.log(notification), 'this is the notification';
    this.setState({ notification: notification });
  };

  filterMantra = (array) => {
    let rand = Math.random();
    let arrayLength = array.length;
    let randIndex = Math.floor(rand * arrayLength);
    let randomMantra = array[randIndex].mantra;
    return randomMantra;
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    // const realMantra = this.filterMantra(this.state.mantra);
    const message = {
      owner: 'me',
      slug: 'this is the slugg',
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Mantra Reminder',
      body: this.filterMantra(this.state.mantra),
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Button
          icon="camera"
          mode="contained"
          onPress={() => this.sendPushNotification()}
        >
          Give me a Random Mantra
        </Button>
        <Button
          icon="clock-fast"
          mode="contained"
          onPress={() => this.setNotificationTimerHour()}
        >
          Send Me a Mantra In an Hour
        </Button>
        <Button
          icon="calendar-clock"
          mode="contained"
          onPress={() => this.setNotificationTimerDay()}
        >
          Send me a Mantra in a Day
        </Button>
        <Button
          icon="cancel"
          mode="contained"
          onPress={() => this.cancelNotificationTimers()}
        >
          Cancel all my notifications
        </Button>
      </View>
    );
  }
}
