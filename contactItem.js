// @flow
import React from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import {Contact} from './contact';

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
        <Text style={styles.header}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    marginHorizontal: 20,
  },
});

export {ContactItem};
