import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {Q} from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';

import {Contact} from '../types/contact';
import {formatNumber} from '../utils/format';
import {ContactItem} from '../components/contactItem';

function RawContactList({contacts}) {
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

const enhance = withObservables(['contacts'], ({contacts, searchText}) => {
  if (contacts.query) {
    if (searchText) {
      return {
        contacts: contacts
          .query(Q.where('name', Q.like(Q.sanitizeLikeString(searchText))))
          .observe(),
      };
    } else {
      return {
        contacts: contacts.query().observe(),
      };
    }
  }

  console.log('returning contacts', contacts);

  return {
    contacts,
  };
});

// const ContactList = enhance(RawContactList);
const ContactList = RawContactList;

export {ContactList};
