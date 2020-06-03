import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StatusBar,
  Text,
  Button,
  StyleSheet,
  View,
} from 'react-native';
import Login from './screens/Login';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
// import * as AppAuth from 'expo-app-auth';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [auth, setAuth] = useState(false);

  // let [authState, setAuthState] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let cachedAuth = await getCachedAuthAsync();
  //     if (cachedAuth && !authState) {
  //       setAuthState(cachedAuth);
  //     }
  //   })();
  // }, []);

  const showLogin = () => {
    if (auth === true) {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      );
    } else {
      return <Login setAuth={setAuth} />;
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    {
      console.log(auth);
    }
    return showLogin();
    // <View style={styles.container}>
    //   {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
    //   <NavigationContainer linking={LinkingConfiguration}>
    //     <Stack.Navigator>
    //       <Stack.Screen name="Root" component={BottomTabNavigator} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </View>
    // <View style={styles.container}>
    //   <Text>Expo AppAuth Example</Text>
    //   <Button
    //     title="Sign In with Google "
    //     onPress={async () => {
    //       const _authState = await signInAsync();
    //       setAuthState(_authState);
    //     }}
    //   />
    //   <Button
    //     title="Sign Out "
    //     onPress={async () => {
    //       await signOutAsync(authState);
    //       setAuthState(null);
    //     }}
    //   />
    //   <Text>{JSON.stringify(authState, null, 2)}</Text>
    // </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// let config = {
//   issuer: 'https://accounts.google.com',
//   scopes: ['openid', 'profile'],
//   /* This is the CLIENT_ID generated from a Firebase project */
//   clientId:
//     '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
// };

// let StorageKey = '@MyApp:CustomGoogleOAuthKey';

// export async function signInAsync() {
//   let authState = await AppAuth.authAsync(config);
//   await cacheAuthAsync(authState);
//   console.log('signInAsync', authState);
//   return authState;
// }

// async function cacheAuthAsync(authState) {
//   return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
// }

// export async function getCachedAuthAsync() {
//   let value = await AsyncStorage.getItem(StorageKey);
//   let authState = JSON.parse(value);
//   console.log('getCachedAuthAsync', authState);
//   if (authState) {
//     if (checkIfTokenExpired(authState)) {
//       return refreshAuthAsync(authState);
//     } else {
//       return authState;
//     }
//   }
//   return null;
// }

// function checkIfTokenExpired({ accessTokenExpirationDate }) {
//   return new Date(accessTokenExpirationDate) < new Date();
// }

// async function refreshAuthAsync({ refreshToken }) {
//   let authState = await AppAuth.refreshAsync(config, refreshToken);
//   console.log('refreshAuth', authState);
//   await cacheAuthAsync(authState);
//   return authState;
// }

// export async function signOutAsync({ accessToken }) {
//   try {
//     await AppAuth.revokeAsync(config, {
//       token: accessToken,
//       isClientIdProvided: true,
//     });
//     await AsyncStorage.removeItem(StorageKey);
//     return null;
//   } catch (e) {
//     alert(`Failed to revoke token: ${e.message}`);
//   }
// }
