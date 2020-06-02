import React, { useState, useEffect } from 'react';
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
    console.log('everything', everything);
    if (value.index) {
      for (let i = 0; i < everything.length; i++) {
        if (everything[i].score_id + 1 === value.index) {
          return everything[i].comment;
        }
      }
      console.log('everything', everything[0].score_id);
      console.log('value', value.index + 1);
    }
  };

  const renderChart = () => {
    if (data.length === 0) {
      return <Text>Loading ...</Text>;
    } else {
      return (
        <View>
          <ScrollView>
            <Text>1 Week Mood Example</Text>
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
                legend: [],
              }}
              width={Dimensions.get('window').width}
              height={350}
              fromZero={true}
              yAxisLabel={''}
              verticalLabelRotation={35}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#ADD8E6',
                decimalPlaces: 0,
                color: (opacity = 0.1) => `rgba(89,89,89, ${opacity})`,
                labelColor: (opacity = 0.1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
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
                console.log('valueeeeeeeee', value);
              }}
            />
          </ScrollView>
          <Text>
            {value.date}
            {value.value}
            {showComment()}
          </Text>
        </View>
      );
    }
  };

  return renderChart();
};

export default MoodChart;
