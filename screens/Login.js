import React, { useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import { Button, Card, TextInput } from 'react-native-paper';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const apiPost = () => {
    axios
      .post('https://help-for-heroes.herokuapp.com/users/', {
        username: username,
        password: password,
      })
      .then((response) => {
        // console.log(response);
        // // alert('Success');
      })
      .catch((error) => {
        console.log(error);
        alert('Please try again later.');
      });
  };

  // axios.get('/user', {
  //   params: {
  //     ID: 12345
  //   }
  // })

  const wipeForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = () => {
    // apiPost();
    setAuth(true);
    wipeForm();
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
        label="Email"
        value={email}
        autoFocus={true}
        autoCompleteType="email"
        onChangeText={(input) => setEmail(input)}
      />
      <TextInput
        secureTextEntry={true}
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

export default Login;
