import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MetricsContext} from '../contexts/metricsContext';
import {ContactItem} from '../components/contactItem';
import {ContactList} from '../components/contactList';
import {ContactScreen} from '../components/contactScreen';
import {MetricsBar} from '../components/metricsBar';
import {inMemoryContactService} from '../services/inMemoryContactService';

function InMemoryScreen() {
  const {memoryStartTime, memoryCompleteTime} = useContext(MetricsContext);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      {memoryStartTime ? (
        <ContactScreen
          contactService={inMemoryContactService}
          ContactItem={ContactItem}
          ContactList={ContactList}
        />
      ) : null}

      <MetricsBar diffTime={memoryCompleteTime - memoryStartTime} />
    </SafeAreaView>
  );
}

export {InMemoryScreen};
