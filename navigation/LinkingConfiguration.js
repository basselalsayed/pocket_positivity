import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: 'home',
        Mantras: 'mantras',
        Notifications: 'notifications',
        Stats: 'stats',
      },
    },
    Login: {
      path: 'login',
      screens: {
        Login: 'login',
      },
    },
  },
};
