import React from 'react';
import { Text, View, Button, Vibration, Platform } from 'react-native';
import { Notifications, Device, registerRootComponent } from 'expo';
import * as Permissions from 'expo-permissions';
import App from './App';
import Constants from 'expo-constants';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
export default class AppContainer extends React.Component {
  state = {
    expoPushToken: '',
    notification: {},
    currentUser: {},
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
      alert('Must use physical iOS or Android device');
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

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = (notification) => {
    Vibration.vibrate();
    console.log(notification), 'this is the notification';
    this.setState({ notification: notification });
  };

  render() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }
}

registerRootComponent(AppContainer);
