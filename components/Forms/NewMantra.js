// import React, { useState } from 'react';
// import { View } from 'react-native';

// import { TextInput, Button } from 'react-native-paper';

// const NewMantra = (props) => {
//   // const { handleSubmit } = props;
//   const [input, setInput] = useState('');

//   return (

//   );
// };

// export default NewMantra;

import React from 'react';
import { Chip } from 'react-native-paper';

const MyComponent = () => (
  <Chip icon="information" onPress={() => console.log('Pressed')}>
    Example Chip
  </Chip>
);

export default MyComponent;
