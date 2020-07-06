import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      {watermelonStartTime ? (
        <ContactScreen
          contactService={watermelonContactService}
          ContactList={EnhancedContactList}
        />
      ) : null}

      <MetricsBar diffTime={watermelonCompleteTime - watermelonStartTime} />
    </SafeAreaView>
  );
}

export {WatermelonScreen};
