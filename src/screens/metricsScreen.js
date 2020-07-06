import React, {useContext} from 'react';
import {Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

import {MetricsContext} from '../contexts/metricsContext';

const CHART_HEIGHT = Dimensions.get('screen').height * 0.85;
const CHART_WIDTH = Dimensions.get('screen').width;

const CHART_CONFIG = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: () => 'rgba(0, 0, 0, 1)',
  labelColor: () => 'rgba(0, 0, 0, 1)',
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffffff',
  },
};

function MetricsScreen() {
  const {labels, metrics} = useContext(MetricsContext);

  return (
    <>
      {metrics[0] ? (
        <LineChart
          bezier
          chartConfig={CHART_CONFIG}
          data={{
            labels,
            datasets: metrics,
            legend: metrics.map(({name}) => name),
          }}
          xAxisLabel="c"
          yAxisSuffix="s"
          yAxisInterval={Number.MAX_SAFE_INTEGER}
          withVerticalLabels={false}
          height={CHART_HEIGHT}
          width={CHART_WIDTH}
        />
      ) : null}
    </>
  );
}

export {MetricsScreen};
