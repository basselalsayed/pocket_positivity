import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Text } from 'react-native';

import { Button, Card, TextInput } from 'react-native-paper';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null,
};
export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleSubmitFirebase = () => {
    const { username, email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
        alert(error);
      });
  };

  handleSubmit = () => {
    this.props.setAuth(true);
  };

  render() {
    const { username, email, password, error } = this.state;
    return (
      <Card>
        <TextInput
          label='Username'
          value={username}
          autoFocus={true}
          autocompletetype='username'
          onChangeText={input => this.setState({ username: input })}
        />
        <TextInput
          label='Email'
          value={email}
          autoFocus={true}
          autocompletetype='email'
          onChangeText={input => this.setState({ email: input })}
        />
        <TextInput
          secureTextEntry={true}
          label='Password'
          value={password}
          textContentType='newPassword'
          passwordrules='required: lower; required: upper; required: digit; required: [-]; minlength: 6; maxlength: 20;'
          onChangeText={input => this.setState({ password: input })}
        />
        <Button onPress={this.handleSubmitFirebase}>Submit</Button>
        {error && <Text>{error.message}</Text>}
      </Card>
    );
  }
}

export default withFirebase(LoginForm);
