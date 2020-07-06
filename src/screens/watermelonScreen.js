import React, {useContext} from 'react';
import {StatusBar} from 'react-native';

import {MetricsContext} from '../contexts/metricsContext';
import {ContactScreen} from '../components/contactScreen';
import {EnhancedContactList} from '../components/contactList';
import {MetricsBar} from '../components/metricsBar';
import {watermelonContactService} from '../services/watermelonContactService';

function WatermelonScreen() {
  const {watermelonStartTime, watermelonCompleteTime} = useContext(
    MetricsContext,
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />

      {watermelonStartTime ? (
        <ContactScreen
          contactService={watermelonContactService}
          ContactList={EnhancedContactList}></ContactScreen>
      ) : null}

      <MetricsBar diffTime={watermelonCompleteTime - watermelonStartTime} />
    </>
  );
}

export {WatermelonScreen};
