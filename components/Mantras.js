import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title } from 'react-native-paper';

const Mantras = ({ mantras }) => {
  const [mantraList, setMantraList] = useState([]);

  useEffect(() => {
    setMantraList(mantras);
  }, [mantras]);

  return mantraList.map((mantra) => {
    return (
      <Card key={mantra.mantra_id} style={styles.mantraContainer}>
        <Card.Content>
          <Title children={mantra.mantra} />
        </Card.Content>
      </Card>
    );
  });
};

export default Mantras;
const styles = StyleSheet.create({
  mantraContainer: {
    alignItems: 'center',
    marginHorizontal: 0,
  },
});
