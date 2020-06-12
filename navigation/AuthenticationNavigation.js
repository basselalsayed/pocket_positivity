import React from 'react';

import { AuthUserContext, withAuthentication } from '../components/Session';
import { DashboardScreen, LoginScreen } from '../screens';

const AuthenticationNavigation = props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <DashboardScreen /> : <LoginScreen />)}
    </AuthUserContext.Consumer>
  );
};

export default AuthenticationNavigation;
