import Realm from 'realm';

import {
  performanceService,
  PERFOMANCE_EVENTS,
} from '../services/performanceService';
import {ContactService} from '../types/contactService';
import {
  RealmAddress,
  RealmCompany,
  CONTACT_MODEL,
  RealmContact,
  RealmDate,
  RealmEmail,
  RealmField,
  RealmNote,
  RealmPhonenumber,
  RealmRelatedName,
  RealmRingtone,
  RealmSocialProfile,
  RealmUrl,
} from '../realmModels/realmContact.model';
import {generateContact} from '../utils/contactGenerator';
import {InteractionManager} from 'react-native';

class RealmContactService implements ContactService {
  realm;

  constructor() {
    Realm.open({
      schema: [
        RealmAddress,
        RealmCompany,
        RealmContact,
        RealmDate,
        RealmEmail,
        RealmField,
        RealmNote,
        RealmPhonenumber,
        RealmRelatedName,
        RealmRingtone,
        RealmSocialProfile,
        RealmUrl,
      ],
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
    let index = startIndex;

    this.realm.write(() => {
      for (let i = 0; i < batchSize && index < count; i++) {
        this.realm.create(CONTACT_MODEL, generateContact(index));

        index++;
      }

      performanceService.trackEvent(PERFOMANCE_EVENTS.realmWrite);

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
