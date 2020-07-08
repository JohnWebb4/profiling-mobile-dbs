import React from 'react';
import {FlatList, StyleSheet, Text, Dimensions, View} from 'react-native';
import {Q} from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';

import {Contact} from '../types/contact';
import {formatNumber} from '../utils/format';

// Lazy
const FLAT_HEIGHT = Dimensions.get('screen').height * 0.75;

function ContactList({contacts, ContactItem}) {
  function renderContactItem(props) {
    return <ContactItem {...props} />;
  }
  return (
    <>
      {contacts.length ? (
        <Text
          style={[
            styles.paddingHorizon,
            styles.paddingBott,
          ]}>{`Matches: ${formatNumber(contacts.length)}`}</Text>
      ) : null}

      <View style={styles.container}>
        <FlatList
          style={styles.paddingHorizon}
          data={contacts}
          keyExtractor={getContactKey}
          renderItem={renderContactItem}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: FLAT_HEIGHT,
  },
  paddingHorizon: {
    marginHorizontal: 20,
  },
  paddingBott: {
    marginBottom: 10,
  },
});

function getContactKey({key}: Contact) {
  return key;
}

const enhance = withObservables(
  ['contacts', 'searchText'],
  ({contacts, searchText}) => {
    if (contacts.query) {
      if (searchText) {
        return {
          contacts: contacts
            .query(
              Q.where('name', Q.like(`%${Q.sanitizeLikeString(searchText)}%`)),
            )
            .observe(),
        };
      } else {
        return {
          contacts: contacts.query().observe(),
        };
      }
    }

    return {
      contacts,
    };
  },
);

const EnhancedContactList = enhance(ContactList);

export {ContactList, EnhancedContactList};
