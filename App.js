/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, FlatList} from 'react-native';
import {ContactItem} from './contactItem';
import {Contact} from './contact';

const data: Contact[] = [
  {
    id: '1',
    name: 'John',
  },
  {
    id: '2',
    name: 'Joe',
  },
  {
    id: '3',
    name: 'Stuff',
  },
];

function App(): React$Node {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FlatList
        style={{backgroundColor: 'green'}}
        data={data}
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
