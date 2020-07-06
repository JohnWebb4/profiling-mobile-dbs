import {InteractionManager} from 'react-native';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {
  performanceService,
  PERFOMANCE_EVENTS,
} from '../services/performanceService';
import {ContactService} from '../types/contactService';
import {getName} from '../utils/nameGenerator';
import {schema} from '../watermelonModels/watermelonSchema';
import {WatermelonContact} from '../watermelonModels/watermelonContact.model';
import {CONTACT_TABLE_NAME} from '../watermelonModels/watermelonContact.model';

class WatermelonContactService implements ContactService {
  database: Database;
  contactsCollection;

  constructor() {
    const adapter = new SQLiteAdapter({
      schema,
    });

    this.database = new Database({
      adapter,
      modelClasses: [WatermelonContact],
      actionsEnabled: true,
    });

    this.contactsCollection = this.database.collections.get(CONTACT_TABLE_NAME);
  }

  close() {}

  async deleteAllContacts() {
    // Destroy everything in DB. Being lazy for now.
    await this.database.action(async () => {
      await this.database.unsafeResetDatabase();
    }, 'Delete all contacts');
  }

  getContacts(): Contact[] {
    return this.contactsCollection;
  }

  async writeXSampleContacts(
    count: number,
    batchSize: number,
    batchInterval: number,
    startIndex: number = 0,
    cb: () => {},
  ): Promise<void> {
    let index = startIndex;

    const batchActions = [];

    await this.database.action(async () => {
      for (let i = 0; i < batchSize && index < count; i++) {
        batchActions.push(
          this.contactsCollection.prepareCreate((contact) => {
            contact.key = String(index);
            contact.name = getName(index);
          }),
        );

        index++;
      }

      await this.database.batch(...batchActions);

      performanceService.trackEvent(PERFOMANCE_EVENTS.watermelonWrite);

      if (index < count) {
        setTimeout(() => {
          InteractionManager.runAfterInteractions(async () => {
            await this.writeXSampleContacts(
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
    }, 'Create Sample Contacts');
  }
}

const watermelonContactService = new WatermelonContactService();

export {watermelonContactService};
