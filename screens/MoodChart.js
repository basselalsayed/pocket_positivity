import React, { useState, useEffect, useReducer } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const MoodChart = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [value, setValue] = useState('');
  const [everything, setEverything] = useState('');

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
    let everythingArray = [];
    response.forEach((element) => {
      dataArray.push(element.score);
      labelsArray.push(element.date.slice(0, 10));
      everythingArray.push(element);
    });
    setData(dataArray);
    setLabels(labelsArray);
    setEverything(everythingArray);
  };

  const showComment = () => {
    if (value.value) {
      for (let i = 0; i < everything.length; i++) {
        if (everything[i].score_id === value.index + 1) {
          return everything[i].comment;
        }
      }
    }
  };

  const showDate = () => {
    if (value.value) {
      for (let i = 0; i < everything.length; i++) {
        if (everything[i].score_id === value.index + 1) {
          return everything[i].date.slice(0, 10);
        }
      }
    }
  };

  const renderChart = () => {
    if (data.length === 0) {
      return (
        <Text
          style={{
            fontStyle: 'italic',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18,
          }}
        >
          Loading...
        </Text>
      );
    } else {
      return (
        <View>
          <ScrollView>
            <Text
              style={{
                fontStyle: 'italic',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 18,
              }}
            >
              Previous Mood Ratings and Comments
            </Text>
            <LineChart
              key={1}
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data,
                    strokeWidth: 2,
                  },
                ],
              }}
              width={Dimensions.get('window').width}
              height={425}
              fromZero={true}
              verticalLabelRotation={70}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: 'rgb(255, 255, 255)',
                backgroundGradientFrom: 'rgb(255, 255, 255)',
                backgroundGradientTo: 'rgb(255, 255, 255)',
                backgroundGradientFromOpacity: 0,
                fillShadowGradient: 'rgb(255, 255, 255)',
                fillShadowGradientOpacity: 0,
                decimalPlaces: 0,
                color: (opacity = 0.1) => `rgba(0,0,0, ${opacity})`,
                labelColor: (opacity = 0.1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '6',
                  stroke: '#ADD8E6',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              onDataPointClick={(value) => {
                setValue(value);
              }}
            />
          </ScrollView>
          <Text>{showDate()}</Text>
          <Text>{value.value}</Text>
          <Text>{showComment()}</Text>
        </View>
      );
    }
  };

  return renderChart();
};

export default MoodChart;
