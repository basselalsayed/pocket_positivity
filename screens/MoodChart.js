import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const MoodChart = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios
      .get('https://help-for-heroes.herokuapp.com/scores/1')
      .then((response) => getScores(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getScores = (response) => {
    let dataArray = [];
    let labelsArray = [];
    response.forEach((element) => {
      dataArray.push(element.score);
      labelsArray.push(element.date.slice(0, 10));
    });
    setData(dataArray);
    setLabels(labelsArray);
  };

  const renderChart = () => {
    if (data.length === 0) {
      return <Text>Loading ...</Text>;
    } else {
      return (
        <View>
          {console.log(data)}
          <ScrollView>
            <Text>Bezier Line Chart</Text>
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data,
                    strokeWidth: 2, // optional
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              // yAxisLabel="$"
              // yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#0000A0',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 0.5) => `rgba(244, 250, 211, ${opacity})`,
                labelColor: (opacity = 0.5) =>
                  `rgba(156, 146, 232, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>
        </View>
      );
    }
  };

  return renderChart();
};

export default MoodChart;
