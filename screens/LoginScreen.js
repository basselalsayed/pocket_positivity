import React from 'react';
import LoginForm from '../components/Forms/Login';
import { Card } from 'react-native-paper';

const LoginScreen = () => {
  return (
    <Card>
      <Card.Title>Welcome!</Card.Title>
      <LoginForm />
    </Card>
  );
};

export { LoginScreen };
