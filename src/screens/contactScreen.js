import React, {useEffect, useState} from 'react';
import {InteractionManager, StyleSheet} from 'react-native';

import {SearchBar} from '../components/searchBar';

import {ContactList} from '../components/contactList';

function ContactScreen({contactService}) {
  const [contacts, updateContacts] = useState([]);
  const [searchText, updateSearchText] = useState('');

  useEffect(() => {
    InteractionManager.runAfterInteractions(async () => {
      updateContacts(await contactService.getContacts());
    });
  }, []);

  let searchContacts = contacts;

  if (searchText) {
    if (contacts.filtered) {
      searchContacts = contacts.filtered('name CONTAINS[c] $0', searchText);
    } else {
      searchContacts = contacts.filter(({name}) =>
        name.includes(searchContacts),
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

      <ContactList contacts={contacts} searchText={searchText} />
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

export {ContactScreen};
