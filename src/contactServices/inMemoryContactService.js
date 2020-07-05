// @flow
import {InteractionManager} from 'react-native';

import {Contact} from '../types/contact';
import {ContactService} from '../types/contactService';
import {getName} from '../utils/nameGenerator';

let data: Contact[] = [];

class InMemoryContactService implements ContactService {
  close() {}

  deleteAllContacts() {
    data = [];
  }

  getContacts() {
    return data;
  }

  writeXSampleContacts(
    count: number,
    batchSize: number,
    batchInterval: number,
    startIndex: number = 0,
    cb: () => {},
  ) {
    console.log('asdf - write sample contacts. Current count: ', data.length);

    let index = startIndex;

    for (let i = 0; i < batchSize && index < count; i++) {
      data.push({
        id: String(index),
        name: getName(index),
      });

      index++;
    }

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
