import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import LinkingConfiguration from '../../navigation/LinkingConfiguration';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
const Stack = createStackNavigator();

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
      <NavigationContainer linking={LinkingConfiguration}>
        <Stack.Navigator>
          <Stack.Screen name='Root' component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
