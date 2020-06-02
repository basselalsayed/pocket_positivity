import React, { useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import { Button, Card, TextInput } from 'react-native-paper';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const apiPost = () => {
    axios
      .post('https://help-for-heroes.herokuapp.com/users', {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        alert('Success');
      })
      .catch((error) => {
        console.log(error);
        alert('Please try again later.');
      });
  };

  const wipeForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === true) {
      apiPost();
      wipeForm();
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <Card>
      <TextInput
        label="Username"
        value={username}
        autoFocus={true}
        autoCompleteType="username"
        onChangeText={(input) => setUsername(input)}
      />
      <TextInput
        label="Email Address"
        value={email}
        textCompleteType="email"
        autoCompleteType="email"
        onChangeText={(input) => setEmail(input)}
      />
      <TextInput
        label="Password"
        value={password}
        textContentType="newPassword"
        passwordRules="required: lower; required: upper; required: digit; required: [-]; minlength: 6; maxlength: 20;"
        onChangeText={(input) => setPassword(input)}
      />
      <Button onPress={handleSubmit}>Submit</Button>
    </Card>
  );
};

export default SignUp;
