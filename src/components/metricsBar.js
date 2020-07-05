import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function MetricsBar({diffTime}) {
  return (
    <View style={styles.container}>
      {diffTime ? (
        <Text style={styles.metric}>{`Diff Time: ${diffTime / 1000}s`}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  metric: {
    fontSize: 20,
  },
});

export {MetricsBar};
