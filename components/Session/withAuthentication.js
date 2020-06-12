import React from 'react';
import { AuthUserContext } from '../Session';
import Firebase, { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class withAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      console.log(this.props);
      this.listener = Firebase.app.auth().onAuthStateChanged(authUser => {
        console.log(authUser, 'authUser from WA');
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withAuthentication;
};

export default withAuthentication;
