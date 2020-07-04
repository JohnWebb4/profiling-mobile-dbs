import {ContactService} from '../types/contactService';

class RealmContactService implements ContactService {
  deleteAllContacts() {
    return;
  }

  getContacts(): Contact[] {
    return [];
  }

  writeXSampleContacts(count: number): void {
    return;
  }
}

const realmContactService = new RealmContactService();

export {realmContactService};
