import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {Q} from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';

import {ContactItem} from '../components/contactItem';
import {Contact} from '../types/contact';
import {formatNumber} from '../utils/format';

function ContactList({contacts}) {
  return (
    <>
      {contacts.length ? (
        <Text
          style={[styles.container, styles.padding]}>{`Matches: ${formatNumber(
          contacts.length,
        )}`}</Text>
      ) : null}

      <FlatList
        style={styles.container}
        data={contacts}
        keyExtractor={getContactKey}
        renderItem={ContactItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  padding: {
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
