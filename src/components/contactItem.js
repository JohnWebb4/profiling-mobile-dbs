// @flow
import React from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import {Contact} from '../types/contact';
import withObservables from '@nozbe/with-observables';

function ContactItem(data: {item: Contact}): React$Node {
  const {item, separators} = data;
  const {key, firstName, lastName} = item;

  const company = data.company || item.company;

  function onPress() {
    Alert.alert(
      JSON.stringify({
        company,
        firstName,
        lastName,
      }),
    );
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

const enhance = withObservables([], ({item}) => {
  return {
    company: item.company && item.company.observe(),
  };
});

const EnhancedContactItem = enhance(ContactItem);

const styles = StyleSheet.create({
  key: {
    color: 'blue',
  },
  header: {
    fontSize: 50,
  },
});

export {ContactItem, EnhancedContactItem};
