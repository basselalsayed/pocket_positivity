import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/Dashboard/ProfileScreen';
import ChatScreen from '../screens/Dashboard/ChatScreen';
import MantrasScreen from '../screens/Dashboard/MantrasScreen';
import NotificationsTest from '../screens/Dashboard/NotificationsTest';
import MoodChart from '../screens/Dashboard/MoodChart';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Chat';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Account'
        component={ProfileScreen}
        options={{
          title: 'Profile',

          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-person' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Chats'
        component={ChatScreen}
        options={{
          title: 'Chat',

          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-chatbubbles' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Mantras'
        component={MantrasScreen}
        options={{
          title: 'Mantras',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-happy' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Notifications'
        component={NotificationsTest}
        options={{
          title: 'Notification',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-notifications' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Mood Charts'
        component={MoodChart}
        options={{
          title: 'Mood Charts',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-stats' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Chat';
    case 'Links':
      return 'Mantras';
    case 'Notifications':
      return 'Notifications';
    case 'Mood Charts':
      return 'Mood Charts';
  }
}
