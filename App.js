/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StatusBar, InteractionManager} from 'react-native';

import {inMemoryContactService} from './src/contactServices/inMemoryContactService';
// import {realmContactService} from './src/contactServices/realmContactService';
import {ContactScreen} from './src/screens/contactScreen';
import {MetricsBar} from './src/components/metricsBar';

const BATCH_SIZE = 1000; // contacts per batch
const BATCH_INTERVAL = 100; // ms
const SAMPLE_CONTACT_COUNT = 100000; // total number of sample contacts

function App(): React$Node {
  const contactService = inMemoryContactService;

  const [completeTime, updateCompleteTime] = useState(undefined);
  const [startTime, updateStartTime] = useState(undefined);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      contactService.deleteAllContacts();

      updateStartTime(Date.now());

      contactService.writeXSampleContacts(
        SAMPLE_CONTACT_COUNT,
        BATCH_SIZE,
        BATCH_INTERVAL,
        0,
        () => {
          updateCompleteTime(Date.now);
        },
      );
    });

    return () => {
      contactService.close();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <ContactScreen contactService={contactService} />

      <MetricsBar diffTime={completeTime - startTime} />
    </>
  );
}

export default App;
