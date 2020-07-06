import React, {useContext} from 'react';
import {StatusBar} from 'react-native';

import {MetricsContext} from '../contexts/metricsContext';
import {ContactList} from '../components/contactList';
import {ContactScreen} from '../components/contactScreen';
import {MetricsBar} from '../components/metricsBar';
import {realmContactService} from '../services/realmContactService';

function RealmScreen() {
  const {realmStartTime, realmCompleteTime} = useContext(MetricsContext);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      {realmStartTime ? (
        <ContactScreen
          contactService={realmContactService}
          ContactList={ContactList}
        />
      ) : null}

      <MetricsBar diffTime={realmCompleteTime - realmStartTime} />
    </>
  );
}

export {RealmScreen};