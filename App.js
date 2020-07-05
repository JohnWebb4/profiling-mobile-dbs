/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StatusBar, InteractionManager} from 'react-native';

import {ContactScreen} from './src/screens/contactScreen';
import {MetricsBar} from './src/components/metricsBar';

// Swap for contactService as you see fit
import {inMemoryContactService} from './src/contactServices/inMemoryContactService';
// import {realmContactService} from './src/contactServices/realmContactService';
// import {watermelonContactService} from './src/contactServices/watermelonContactService';

const BATCH_SIZE = 1000; // contacts per batch
const BATCH_INTERVAL = 100; // ms
const SAMPLE_CONTACT_COUNT = 100000; // total number of sample contacts

function App(): React$Node {
  const contactService = inMemoryContactService;
  // const contactService = realmContactService;
  // const contactService = watermelonContactService;

  const [completeTime, updateCompleteTime] = useState(undefined);
  const [startTime, updateStartTime] = useState(undefined);

  useEffect(() => {
    InteractionManager.runAfterInteractions(async () => {
      try {
        await contactService.deleteAllContacts();

        updateStartTime(Date.now());

        await contactService.writeXSampleContacts(
          SAMPLE_CONTACT_COUNT,
          BATCH_SIZE,
          BATCH_INTERVAL,
          0,
          () => {
            updateCompleteTime(Date.now);
          },
        );
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      {startTime ? <ContactScreen contactService={contactService} /> : null}

      <MetricsBar diffTime={completeTime - startTime} />
    </>
  );
}

export default App;
