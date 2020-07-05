import React, {useEffect, useState} from 'react';
import {InteractionManager, FlatList, StyleSheet, Text} from 'react-native';

import {ContactItem} from '../components/contactItem';
import {SearchBar} from '../components/searchBar';
import {Contact} from '../types/contact';
import {formatNumber} from '../utils/format';

function ContactScreen({contactService}) {
  const [contacts, updateContacts] = useState([]);
  const [searchText, updateSearchText] = useState('');
  const [updateInterval, updateUpdateInterval] = useState();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      updateContacts(contactService.getContacts());
    });

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  let searchContacts = contacts;

  if (searchText) {
    if (contacts.filtered) {
      searchContacts = contacts.filtered('name CONTAINS[c] $0', searchText);
    } else {
      searchContacts = contacts.filter(({name}) =>
        name.contains(searchContacts),
      );
    }
  }

  return (
    <>
      <SearchBar
        onChangeText={updateSearchText}
        placeholder={'Search Contact name'}
        style={styles.container}>
        {searchText}
      </SearchBar>

      <Text
        style={[styles.container, styles.padding]}>{`Matches: ${formatNumber(
        searchContacts.length,
      )}`}</Text>

      <FlatList
        style={styles.container}
        data={searchContacts}
        keyExtractor={getContactKey}
        renderItem={ContactItem}
      />
    </>
  );
}

function getContactKey({id}: Contact) {
  return id;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  padding: {
    marginBottom: 10,
  },
});

export {ContactScreen};
