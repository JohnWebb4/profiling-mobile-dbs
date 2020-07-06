import React, {useContext} from 'react';
import {StatusBar} from 'react-native';

import {MetricsContext} from '../contexts/metricsContext';
import {ContactList} from '../components/contactList';
import {ContactScreen} from '../components/contactScreen';
import {MetricsBar} from '../components/metricsBar';
import {inMemoryContactService} from '../services/inMemoryContactService';

function InMemoryScreen() {
  const {memoryStartTime, memoryCompleteTime} = useContext(MetricsContext);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      {memoryStartTime ? (
        <ContactScreen
          contactService={inMemoryContactService}
          ContactList={ContactList}
        />
      ) : null}

      <MetricsBar diffTime={memoryCompleteTime - memoryStartTime} />
    </>
  );
}

export {InMemoryScreen};
