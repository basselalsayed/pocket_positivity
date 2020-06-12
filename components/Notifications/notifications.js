import { Vibration, Platform } from 'react-native';
import { Notifications, Device } from 'expo';
import * as Permissions from 'expo-permissions';

import Constants from 'expo-constants';

class Notification {
  constructor() {
    this.expoPushToken = '';
    this.notification = {};
    this.currentUser = {};

    try {
      this.registerForPushNotificationsAsync();
    } catch (error) {
      console.log(err, 'Error');
    }
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification,
    );
  }

  registerForPushNotificationsAsync = async () => {
    if (
      (Platform.OS === 'android' || Platform.OS === 'ios') &&
      Constants.isDevice
    ) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS,
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS,
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      this.expoPushToken = token;
      console.log(this.expoPushToken, 'this is the token in class');
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

  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification), 'this is the notification';
    this.notification = notification;
    console.log(this.notification), 'this is the notification in class';
  };

  setNotificationTimerHour = mantra => {
    Notifications.scheduleLocalNotificationAsync(
      { title: 'the title', body: mantra },
      { time: new Date().getTime() + 3600000, repeat: 'hour' },
    );
  };

  setNotificationTimerDay = mantra => {
    Notifications.scheduleLocalNotificationAsync(
      { title: 'the title', body: mantra },
      { time: new Date().getTime() + 86400000, repeat: 'day' },
    );
  };

  cancelNotificationTimers = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
  };
}

export default Notification;
