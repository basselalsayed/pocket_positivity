import React, { useState } from 'react';

import { TextInput } from 'react-native-paper';
import axios from 'axios';

const NewMantra = () => {
  const [input, setInput] = useState('');

  // const onSubmit = (e) => {
  //   axios.post()
  // }
  return (
    <TextInput
      label="Enter a new Mantra..."
      value={input}
      onChangeText={(input) => setInput(input)}
    />
  );
};

export default NewMantra;
