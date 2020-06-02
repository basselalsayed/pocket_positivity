import React from 'react';
import { View } from 'react-native';
import { Card, Title } from 'react-native-paper';

const Mantras = (props) => {
  const { mantras } = props;
  return (
    <View>
      {mantras.map((mantra) => {
        return (
          <Card key={mantra.mantra_id} style={styles.mantraContainer}>
            <Card.Content>
              <Title children={mantra.mantra} />
            </Card.Content>
          </Card>
        );
      })}
    </View>
  );
};

export default Mantras;
