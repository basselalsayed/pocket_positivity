import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAxStgl4BrCN1PojC4tGk-6UQg-W1rkI60',
  authDomain: 'pocket-positivity.firebaseapp.com',
  databaseURL: 'https://pocket-positivity.firebaseio.com',
  projectId: 'pocket-positivity',
  storageBucket: 'pocket-positivity.appspot.com',
  messagingSenderId: '640561595797',
  appId: '1:640561595797:web:e7a1055a422e5c21a0e29c',
  measurementId: 'G-14V54XY6BG',
};

export class Firebase {
  constructor() {
    try {
      app.initializeApp(config);
    } catch (err) {
      // we skip the “already exists” message which is
      // not an actual error when we’re hot-reloading
      if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error raised', err.stack);
      }
    }
    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
