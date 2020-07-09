import {InteractionManager} from 'react-native';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {
  performanceService,
  PERFOMANCE_EVENTS,
} from '../services/performanceService';
import {ContactService} from '../types/contactService';
import {generateContact} from '../utils/contactGenerator';
import {schema} from '../watermelonModels/watermelonSchema';
import {
  WatermelonAddress,
  WatermelonBirthday,
  CONTACT_TABLE_NAME,
  WatermelonContact,
  WatermelonCompany,
  WatermelonDate,
  WatermelonEmail,
  WatermelonField,
  WatermelonInstantMessages,
  WatermelonNote,
  WatermelonPhonenumber,
  WatermelonRelatedname,
  WatermelonRingtone,
  WatermelonSocialProfile,
  WatermelonTexttone,
  WatermelonUrl,
} from '../watermelonModels/watermelonContact.model';

class WatermelonContactService implements ContactService {
  database: Database;
  contactsCollection;

  constructor() {
    const adapter = new SQLiteAdapter({
      schema,
    });

    this.database = new Database({
      adapter,
      modelClasses: [
        WatermelonAddress,
        WatermelonBirthday,
        WatermelonContact,
        WatermelonCompany,
        WatermelonDate,
        WatermelonEmail,
        WatermelonField,
        WatermelonInstantMessages,
        WatermelonNote,
        WatermelonPhonenumber,
        WatermelonRelatedname,
        WatermelonRingtone,
        WatermelonSocialProfile,
        WatermelonTexttone,
        WatermelonUrl,
      ],
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
        const newContact = generateContact(index);

        this.writeContact(newContact).forEach((action) => {
          batchActions.push(action);
        });

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

  writeContact(newContact) {
    const batchWrites = [];

    batchWrites.push(
      this.contactsCollection.prepareCreate((contact) => {
        // Create children/relations
        contact.addAddresses(newContact.addresses);
        contact.addBirthdays(newContact.birthdays);
        contact.addCompany(newContact.company);
        contact.addDates(newContact.dates);
        contact.addEmails(newContact.emails);
        contact.addFields(newContact.fields);
        contact.addInstantMessages(newContact.instantMessages);
        contact.addNote(newContact.note);
        contact.addPhoneNumbers(newContact.phoneNumbers);
        contact.addRelatedNames(newContact.relatedNames);
        contact.addRingtone(newContact.ringTone);
        contact.addSocialProfiles(newContact.socialProfiles);
        contact.addTexttone(newContact.textTone);
        contact.addUrls(newContact.urls);

        contact.key = newContact.key;
        contact.firstName = newContact.firstName;
        contact.lastName = newContact.lastName;
      }),
    );

    return batchWrites;
  }
}

const watermelonContactService = new WatermelonContactService();

export {watermelonContactService};
