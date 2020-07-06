import React, {useEffect, useState} from 'react';
import {InteractionManager, StyleSheet} from 'react-native';

import {SearchBar} from './searchBar';

function ContactScreen({contactService, ContactList}) {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    InteractionManager.runAfterInteractions(async () => {
      setContacts(await contactService.getContacts());
    });
  }, []);

  let searchContacts = contacts;

  if (searchText) {
    if (contacts.filtered) {
      searchContacts = contacts.filtered('name CONTAINS[c] $0', searchText);
    } else if (contacts.filter) {
      searchContacts = contacts.filter(({name}) =>
        name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }
  }

  return (
    <>
      <SearchBar
        onChangeText={setSearchText}
        placeholder={'Search Contact name'}
        style={[styles.container, styles.searchBar]}>
        {searchText}
      </SearchBar>

      <ContactList contacts={searchContacts} searchText={searchText} />
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
  searchBar: {
    marginTop: 10,
  },
});

export {ContactScreen};
