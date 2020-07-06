// @flow
import {InteractionManager} from 'react-native';

import {
  performanceService,
  PERFOMANCE_EVENTS,
} from '../services/performanceService';
import {Contact} from '../types/contact';
import {ContactService} from '../types/contactService';
import {getName} from '../utils/nameGenerator';

let data: Contact[] = [];

class InMemoryContactService implements ContactService {
  close() {}

  async deleteAllContacts() {
    data = [];
  }

  getContacts() {
    return data;
  }

  async writeXSampleContacts(
    count: number,
    batchSize: number,
    batchInterval: number,
    startIndex: number = 0,
    cb: () => {},
  ) {
    let index = startIndex;

    for (let i = 0; i < batchSize && index < count; i++) {
      data.push({
        key: String(index),
        name: getName(index),
      });

      index++;
    }

    performanceService.trackEvent(PERFOMANCE_EVENTS.inMemoryWrite);

    if (index < count) {
      setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          this.writeXSampleContacts(count, batchSize, batchInterval, index, cb);
        });
      }, batchInterval);
    } else {
      cb();
    }
  }
}

const inMemoryContactService = new InMemoryContactService();

export {inMemoryContactService};
