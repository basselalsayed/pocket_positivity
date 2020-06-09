import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import useCachedResources from './hooks/useCachedResources';

import Firebase, { FirebaseContext } from './components/Firebase';
import DashboardScreen from './screens/Dashboard';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
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

  // const AppSwitchNavigator = createStackNavigator({
  //   LoadingScreen: LoadingScreen,
  //   LoginScreen: LoginScreen,
  //   DashboardScreen: DashboardScreen,
  // });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        {auth ? <DashboardScreen /> : <LoginScreen setAuth={setAuth} />}
      </FirebaseContext.Provider>
    );
  }
}
