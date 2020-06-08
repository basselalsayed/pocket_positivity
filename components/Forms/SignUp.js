import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { withFirebase } from '../Firebase';

import { Button, Card, TextInput } from 'react-native-paper';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = () => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        console.log(error);
      });
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
          onChangeText={input => this.setState({ username: input })}
        />
        <TextInput
          name='email'
          label='Email Address'
          value={email}
          textcompletetype='email'
          autocompletetype='email'
          onChangeText={input => this.setState({ email: input })}
        />
        <TextInput
          name='passwordOne'
          label='Password'
          value={passwordOne}
          textcontenttype='newPassword'
          passwordrules='required: lower; required: upper; required: digit; required: [-]; minlength: 6; maxlength: 20;'
          onChangeText={input => this.setState({ passwordOne: input })}
        />
        <TextInput
          name='passwordTwo'
          label='Confirm Password'
          value={passwordTwo}
          textcontenttype='newPassword'
          passwordrules='required: lower; required: upper; required: digit; required: [-]; minlength: 6; maxlength: 20;'
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
