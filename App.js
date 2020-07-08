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

import {MetricsContext} from './src/contexts/metricsContext';
import {WatermelonScreen} from './src/screens/watermelonScreen';
import {RealmScreen} from './src/screens/realmScreen';
import {InMemoryScreen} from './src/screens/inMemoryScreen';
import {MetricsScreen} from './src/screens/metricsScreen';
import {watermelonContactService} from './src/services/watermelonContactService';
import {realmContactService} from './src/services/realmContactService';
import {inMemoryContactService} from './src/services/inMemoryContactService';
import {
  performanceService,
  PERFOMANCE_EVENTS,
} from './src/services/performanceService';

const BATCH_SIZE = 1000; // contacts per batch
const BATCH_INTERVAL = 100; // ms
const SAMPLE_CONTACT_COUNT = 10000; // total number of sample contacts

const labels = [];

for (let i = 0; i < SAMPLE_CONTACT_COUNT; i += BATCH_SIZE) {
  labels.push(String(i));
}

const Tab = createBottomTabNavigator();

let pingRef;

function App(): React$Node {
  const [memoryStartTime, setMemoryStartTime] = useState();
  const [memoryCompleteTime, setMemoryCompleteTime] = useState();

  const [realmStartTime, setRealmStartTime] = useState();
  const [realmCompleteTime, setRealmCompleteTime] = useState();

  const [watermelonStartTime, setWatermelonStartTime] = useState();
  const [watermelonCompleteTime, setWatermelonCompleteTime] = useState();

  const [metrics, setMetrics] = useState([]);

  performanceService.initDataSets(metrics, setMetrics);

  useEffect(() => {
    // Write contacts here
    InteractionManager.runAfterInteractions(() => {
      pingRef = setInterval(() => console.log('ping', new Date()), 1000);
      writeSampleWatermelonContacts(
        setWatermelonStartTime,
        setWatermelonCompleteTime,
        () => {
          writeSampleRealmContacts(
            setRealmStartTime,
            setRealmCompleteTime,
            () => {
              // Comment out for high contact counts
              clearInterval(pingRef);
              writeSampleMemoryContacts(
                setMemoryStartTime,
                setMemoryCompleteTime,
              );
            },
          );
        },
      );
    });

    return () => {
      watermelonContactService.close();
      realmContactService.close();
      inMemoryContactService.close();
    };
  }, []);

  return (
    <MetricsContext.Provider
      value={{
        labels,

        memoryStartTime,
        memoryCompleteTime,

        realmStartTime,
        realmCompleteTime,

        watermelonStartTime,
        watermelonCompleteTime,

        metrics,
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

function writeSampleWatermelonContacts(setStartTime, setCompleteTime, cb) {
  performanceService.clearEvent(PERFOMANCE_EVENTS.watermelonWrite);

  return writeSampleContactsUsingService(
    watermelonContactService,
    setStartTime,
    setCompleteTime,
    cb,
  );
}

function writeSampleRealmContacts(setStartTime, setCompleteTime, cb) {
  performanceService.clearEvent(PERFOMANCE_EVENTS.realmWrite);

  return writeSampleContactsUsingService(
    realmContactService,
    setStartTime,
    setCompleteTime,
    cb,
  );
}

function writeSampleMemoryContacts(setStartTime, setCompleteTime, cb) {
  performanceService.clearEvent(PERFOMANCE_EVENTS.inMemoryWrite);

  return writeSampleContactsUsingService(
    inMemoryContactService,
    setStartTime,
    setCompleteTime,
    cb,
  );
}

async function writeSampleContactsUsingService(
  contactService,
  setStartTime,
  setCompleteTime,
  cb,
) {
  try {
    await contactService.deleteAllContacts();

    setStartTime(Date.now());

    await contactService.writeXSampleContacts(
      SAMPLE_CONTACT_COUNT,
      BATCH_SIZE,
      BATCH_INTERVAL,
      0,
      () => {
        setCompleteTime(Date.now);

        if (cb) {
          InteractionManager.runAfterInteractions(cb);
        }
      },
    );
  } catch (error) {
    console.error(error);
  }
}

export {App};
