/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {InteractionManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Swap for contactService as you see fit
import {WatermelonScreen} from './src/screens/watermelonScreen';
import {RealmScreen} from './src/screens/realmScreen';
import {InMemoryScreen} from './src/screens/inMemoryScreen';
import {MetricsScreen} from './src/screens/metricsScreen';
import {watermelonContactService} from './src/contactServices/watermelonContactService';
import {realmContactService} from './src/contactServices/realmContactService';
import {inMemoryContactService} from './src/contactServices/inMemoryContactService';

const BATCH_SIZE = 1000; // contacts per batch
const BATCH_INTERVAL = 100; // ms
const SAMPLE_CONTACT_COUNT = 1000; // total number of sample contacts

const Tab = createBottomTabNavigator();

const MetricsContext = React.createContext({});

function App(): React$Node {
  // TODO: Move to provider
  const [watermelonStartTime, updateWatermelonStartTime] = useState();
  const [watermelonCompleteTime, updateWatermelonCompleteTime] = useState();
  const [realmStartTime, updateRealmStartTime] = useState();
  const [realmCompleteTime, updateRealmCompleteTime] = useState();
  const [memoryStartTime, updateMemoryStartTime] = useState();
  const [memoryCompleteTime, updateMemoryCompleteTime] = useState();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      writeSampleWatermelonContacts(
        updateWatermelonStartTime,
        updateWatermelonCompleteTime,
        () => {
          writeSampleRealmContacts(
            updateRealmStartTime,
            updateRealmCompleteTime,
            () => {
              writeSampleMemoryContacts(
                updateMemoryStartTime,
                updateMemoryCompleteTime,
              );
            },
          );
        },
      );
    });
  }, []);

  return (
    <MetricsContext.Provider
      value={{
        memoryStartTime,
        memoryCompleteTime,
        realmStartTime,
        realmCompleteTime,
        watermelonStartTime,
        watermelonCompleteTime,
      }}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Metrics">
          <Tab.Screen
            name="Metrics"
            component={MetricsScreen}
            options={{title: 'Metrics'}}
          />

          <Tab.Screen
            name="Watermelon"
            component={WatermelonScreen}
            options={{title: 'Watermelon DB'}}
          />

          <Tab.Screen
            name="Realm"
            component={RealmScreen}
            options={{title: 'Realm'}}
          />

          <Tab.Screen
            name="In Memory"
            component={InMemoryScreen}
            options={{title: 'In Memory'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MetricsContext.Provider>
  );
}

function writeSampleWatermelonContacts(
  updateStartTime,
  updateCompleteTime,
  cb,
) {
  return writeSampleContactsUsingService(
    watermelonContactService,
    updateStartTime,
    updateCompleteTime,
    cb,
  );
}

function writeSampleRealmContacts(updateStartTime, updateCompleteTime, cb) {
  return writeSampleContactsUsingService(
    realmContactService,
    updateStartTime,
    updateCompleteTime,
    cb,
  );
}

function writeSampleMemoryContacts(updateStartTime, updateCompleteTime, cb) {
  return writeSampleContactsUsingService(
    inMemoryContactService,
    updateStartTime,
    updateCompleteTime,
    cb,
  );
}

async function writeSampleContactsUsingService(
  contactService,
  updateStartTime,
  updateCompleteTime,
  cb,
) {
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

        if (cb) {
          InteractionManager.runAfterInteractions(cb);
        }
      },
    );
  } catch (error) {
    console.error(error);
  }
}

export {App, MetricsContext};
