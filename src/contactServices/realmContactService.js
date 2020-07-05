import Realm from 'realm';

import {ContactService} from '../types/contactService';
import {CONTACT_MODEL, RealmContact} from '../realmModels/RealmContact.model';
import {getName} from '../utils/nameGenerator';
import {InteractionManager} from 'react-native';

class RealmContactService implements ContactService {
  realm;

  constructor() {
    Realm.open({
      schema: [RealmContact],
    }).then((realm) => {
      this.realm = realm;

      console.log(`realm path: ${this.realm.path}`);
    });
  }

  close() {
    this.realm.close();
  }

  async deleteAllContacts() {
    this.realm.write(() => {
      this.realm.delete(this.realm.objects(CONTACT_MODEL));
    });
  }

  getContacts(): Contact[] {
    return this.realm.objects(CONTACT_MODEL);
  }

  async writeXSampleContacts(
    count: number,
    batchSize: number,
    batchInterval: number,
    startIndex: number = 0,
    cb: () => {},
  ): void {
    // console.log(
    //   'Write sample contacts. Current count: ',
    //   this.realm.objects(CONTACT_MODEL).length,
    // );

    let index = startIndex;

    this.realm.write(() => {
      for (let i = 0; i < batchSize && index < count; i++) {
        this.realm.create(CONTACT_MODEL, {
          key: String(index),
          name: getName(index),
        });

        index++;
      }

      if (index < count) {
        setTimeout(() => {
          InteractionManager.runAfterInteractions(() => {
            this.writeXSampleContacts(
              count,
              batchSize,
              batchInterval,
              index,
              cb,
            );
          });
        }, batchInterval);
      } else {
        cb();
      }
    });
  }
}

const realmContactService = new RealmContactService();

export {realmContactService};
