/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StatusBar, FlatList} from 'react-native';

import {ContactItem} from './contactItem';
import {Contact} from './types/contact';
import {inMemoryContactService} from './contactServices/inMemoryContactService';

function App(): React$Node {
  const [contacts, updateContacts] = useState([]);
  const contactService = inMemoryContactService;

  useEffect(() => {
    contactService.writeXSampleContacts(1000000);
    updateContacts(contactService.getContacts());

    return () => {
      contactService.deleteAllContacts();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={contacts}
        keyExtractor={getContactKey}
        renderItem={ContactItem}
      />
    </>
  );
}

function getContactKey({id}: Contact) {
  return id;
}

export default App;
