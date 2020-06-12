import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import useCachedResources from './hooks/useCachedResources';

import Firebase, { withFirebase, FirebaseContext } from './components/Firebase';

import { LoadingScreen } from './screens';

import { ClippingRectangle } from 'react-native';
import AuthenticationNavigation from './navigation/AuthenticationNavigation';
import { withAuthentication } from './components/Session';

const App = props => {
  const isLoadingComplete = useCachedResources();

  // const [firebase, setFirebase] = useState(Firebase);

  // let [authState, setAuthState] = useState(null);

  if (!isLoadingComplete) {
    return <LoadingScreen />;
  } else {
    return (
      <FirebaseContext.Provider value={Firebase}>
        <AuthenticationNavigation />
      </FirebaseContext.Provider>
    );
  }
};

export default withAuthentication(App);
