import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import { withFirebase } from '../Firebase';

import { Button, Card, TextInput } from 'react-native-paper';

import 'firebase/auth';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUp extends Component {
  // const { firebase } = props;
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  // const apiPost = () => {
  //   axios
  //     .post('https://help-for-heroes.herokuapp.com/users', {
  //       username: username,
  //       email: email,
  //       password: password,
  //     })
  //     .then(response => {
  //       console.log(response);
  //       alert('Success');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       alert('Please try again later.');
  //     });
  // };

  // const wipeForm = () => {
  //   setUsername('');
  //   setEmail('');
  //   setPassword('');
  // };

  // const handleSubmit = () => {
  //   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if (reg.test(email) === true) {
  //     apiPost();
  //     wipeForm();
  //   } else {
  //     alert('Please enter a valid email address');
  //   }
  // };

  handleSubmit = () => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // wipeForm();
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => {
    this.setState({ [e]: e });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Card>
        <TextInput
          name='username'
          label='Username'
          value={username}
          autoFocus={true}
          autocompletetype='username'
          // onChangeText={input => setUsername(input)}
          onChangeText={input => this.setState({ username: input })}
        />
        <TextInput
          name='email'
          label='Email Address'
          value={email}
          textCompleteType='email'
          autocompletetype='email'
          // onChangeText={input => setEmail(input)}
          onChangeText={input => this.setState({ email: input })}
        />
        <TextInput
          name='passwordOne'
          label='Password'
          value={passwordOne}
          textcontenttype='newPassword'
          passwordrules='required: lower; required: upper; required: digit; required: [-]; minlength: 6; maxlength: 20;'
          // onChangeText={input => setPassword(input)}
          onChangeText={input => this.setState({ passwordOne: input })}
        />
        <TextInput
          name='passwordTwo'
          label='Confirm Password'
          value={passwordTwo}
          textcontenttype='newPassword'
          passwordrules='required: lower; required: upper; required: digit; required: [-]; minlength: 6; maxlength: 20;'
          // onChangeText={input => setPassword(input)}
          onChangeText={input => this.setState({ passwordTwo: input })}
        />
        <Button disabled={isInvalid} onPress={this.handleSubmit}>
          Submit
        </Button>
        {error && <Text>{error.message}</Text>}
      </Card>
    );
  }
}

export const SignUpForm = withFirebase(SignUp);
export default SignUpForm;
