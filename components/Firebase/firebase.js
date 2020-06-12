import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAxStgl4BrCN1PojC4tGk-6UQg-W1rkI60',
  authDomain: 'pocket-positivity.firebaseapp.com',
  databaseURL: 'https://pocket-positivity.firebaseio.com',
  projectId: 'pocket-positivity',
  storageBucket: 'pocket-positivity.appspot.com',
  messagingSenderId: '640561595797',
  appId: '1:640561595797:web:10023f58040b04bba0e29c',
  measurementId: 'G-PZF3H22V59',
};

// export class Firebase {
//   constructor() {
//     try {
//       app.initializeApp(firebaseConfig);
//     } catch (err) {
//       console.error(err);
//       alert(err, 'fire');
//       // we skip the “already exists” message which is
//       // not an actual error when we’re hot-reloading
//       if (!/already exists/.test(err.message)) {
//         console.error('Firebase initialization error raised', err.stack);
//       }
//     }
//     this.auth = app.auth();
//   }

//   doCreateUserWithEmailAndPassword = (email, password) =>
//     this.auth.createUserWithEmailAndPassword(email, password);

//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);

//   doSignOut = () => this.auth.signOut();

//   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

//   doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
// }
app.initializeApp(firebaseConfig);

const Firebase = {
  // auth

  app: app,
  doSignInWithEmailAndPassword: (email, password) => {
    return app.auth().signInWithEmailAndPassword(email, password);
  },
  doCreateUserWithEmailAndPassword: (email, password) => {
    return app.auth().createUserWithEmailAndPassword(email, password);
  },
  signOut: () => {
    return app.auth().signOut();
  },
  checkUserAuth: user => {
    return app.auth().onAuthStateChanged(user);
  },

  // firestore
  createNewUser: userData => {
    return app
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData);
  },
};
export default Firebase;
