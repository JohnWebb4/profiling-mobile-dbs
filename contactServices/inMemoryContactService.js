// @flow
import {Contact} from '../types/contact';
import {ContactService} from '../types/contactService';
import {getName} from '../utils/nameGenerator';

let data: Contact[] = [];

class InMemoryContactService implements ContactService {
  deleteAllContacts() {
    data = [];
  }

  getContacts() {
    return data;
  }

  writeXSampleContacts(count: number) {
    for (let i = 0; i < count; i++) {
      data.push({
        id: String(i),
        name: getName(i),
      });
    }
  }
}

const inMemoryContactService = new InMemoryContactService();

export {inMemoryContactService};
