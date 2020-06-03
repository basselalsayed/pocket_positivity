import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LinksScreen from '../screens/LinksScreen';
import MantrasScreen from '../screens/MantrasScreen';
import NotificationsTest from '../screens/NotificationsTest';
import MoodChart from '../screens/MoodChart';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={LinksScreen}
        options={{
          title: 'Chat',

          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-chatbubbles" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={MantrasScreen}
        options={{
          title: 'Mantras',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-happy" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Mantras"
        component={MantrasScreen}
        options={{
          title: 'Mantras',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsTest}
        options={{
          title: 'Notification',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-notifications" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Mood Charts"
        component={MoodChart}
        options={{
          title: 'Mood Charts',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-stats" />
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
