import React, { useState } from 'react';

import { TextInput, Button } from 'react-native-paper';

const NewMantra = (props) => {
  const { handleSubmit } = props;
  const [input, setInput] = useState('');

  return (
    <View>
      <TextInput
        label="Enter a new Mantra..."
        value={input}
        onChangeText={(input) => setInput(input)}
      />
      <Button onPress={handleSubmit(input)}>Submit</Button>
    </View>
  );
};

export default NewMantra;
