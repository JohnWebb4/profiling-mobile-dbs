// @flow
import React from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import {Contact} from '../types/contact';

function ContactItem({item, separators}: {item: Contact}): React$Node {
  const {id, name} = item;

  function onPress() {
    Alert.alert(name);
  }

  return (
    <TouchableHighlight
      key={id}
      onPress={onPress}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.highlight}>
      <View>
        <Text style={styles.header}>
          <Text style={styles.id}>{`${id}. `}</Text>
          <Text>{name}</Text>
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  id: {
    color: 'blue',
  },
  header: {
    fontSize: 50,
  },
});

export {ContactItem};
