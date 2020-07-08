// @flow
import React from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import {Contact} from '../types/contact';

function ContactItem({item, separators}: {item: Contact}): React$Node {
  const {key, firstName, lastName} = item;

  function onPress() {
    Alert.alert(JSON.stringify(item));
  }

  return (
    <TouchableHighlight
      key={key}
      onPress={onPress}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.highlight}>
      <View>
        <Text style={styles.header}>
          <Text style={styles.key}>{`${key}. `}</Text>
          <Text>{`${firstName} ${lastName}`}</Text>
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  key: {
    color: 'blue',
  },
  header: {
    fontSize: 50,
  },
});

export {ContactItem};
