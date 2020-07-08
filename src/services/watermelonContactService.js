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
  ADDRESS_TABLE_NAME,
  WatermelonAddress,
  BIRTHDAY_TABLE_NAME,
  WatermelonBirthday,
  CONTACT_TABLE_NAME,
  WatermelonContact,
  COMPANY_TABLE_NAME,
  WatermelonCompany,
  DATE_TABLE_NAME,
  WatermelonDate,
  EMAIL_TABLE_NAME,
  WatermelonEmail,
  FIELD_TABLE_NAME,
  WatermelonField,
  INSTANTMESSAGE_TABLE_NAME,
  WatermelonInstantMessages,
  NOTE_TABLE_NAME,
  WatermelonNote,
  PHONENUMBER_TABLE_NAME,
  WatermelonPhonenumber,
  RELATEDNAME_TABLE_NAME,
  WatermelonRelatedname,
  RINGTONE_TABLE_NAME,
  WatermelonRingtone,
  SOCIALPROFILES_TABLE_NAME,
  WatermelonSocialProfile,
  TEXTTONE_TABLE_NAME,
  WatermelonTexttone,
  URL_TABLE_NAME,
  WatermelonUrl,
} from '../watermelonModels/watermelonContact.model';

const MAX_CALLSTACK_SIZE = 65000;

class WatermelonContactService implements ContactService {
  db: Database;
  contactsCollection;

  constructor() {
    const adapter = new SQLiteAdapter({
      schema,
    });

    this.db = new Database({
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

    this.contactsCollection = this.db.collections.get(CONTACT_TABLE_NAME);
  }

  close() {}

  async deleteAllContacts() {
    // Destroy everything in DB. Being lazy for now.
    await this.db.action(async () => {
      await this.db.unsafeResetDatabase();
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

    await this.db.action(async () => {
      for (let i = 0; i < batchSize && index < count; i++) {
        const newContact = generateContact(index);

        this.writeContact(newContact).forEach((action) => {
          batchActions.push(action);
        });

        index++;
      }

      for (
        let actionIndex = 0;
        actionIndex < batchActions.length;
        actionIndex += MAX_CALLSTACK_SIZE
      ) {
        let subActions = batchActions.slice(
          actionIndex,
          actionIndex + MAX_CALLSTACK_SIZE,
        );

        await this.db.batch(...subActions);
      }

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

    const company = this.addCompany(newContact.company);
    const note = this.addNote(newContact.note);
    const ringTone = this.addRingtone(newContact.ringTone);
    const textTone = this.addTexttone(newContact.textTone);

    const contact = this.contactsCollection.prepareCreate((dbContact) => {
      dbContact.key = newContact.key;
      dbContact.firstName = newContact.firstName;
      dbContact.lastName = newContact.lastName;

      dbContact.company.set(company);
      dbContact.note.set(note);
      dbContact.ringTone.set(ringTone);
      dbContact.textTone.set(textTone);
    });

    // Add dbs
    batchWrites.push(company);
    batchWrites.push(note);
    batchWrites.push(contact);

    // Create children
    batchWrites.push(...this.addAddresses(contact, newContact.addresses));
    batchWrites.push(...this.addBirthdays(contact, newContact.birthdays));
    batchWrites.push(...this.addDates(contact, newContact.dates));
    batchWrites.push(...this.addEmails(contact, newContact.emails));
    batchWrites.push(...this.addFields(contact, newContact.fields));
    batchWrites.push(
      ...this.addInstantMessages(contact, newContact.instantMessages),
    );
    batchWrites.push(...this.addPhoneNumbers(contact, newContact.phoneNumbers));
    batchWrites.push(...this.addRelatedNames(contact, newContact.relatedNames));
    batchWrites.push(
      ...this.addSocialProfiles(contact, newContact.socialProfiles),
    );
    batchWrites.push(...this.addUrls(contact, newContact.urls));

    return batchWrites;
  }

  addAddresses = this.getActionForChild(ADDRESS_TABLE_NAME);
  addBirthdays = this.getActionForChild(BIRTHDAY_TABLE_NAME);
  addCompany = this.getActionForRelation(COMPANY_TABLE_NAME);
  addDates = this.getActionForChild(DATE_TABLE_NAME);
  addEmails = this.getActionForChild(EMAIL_TABLE_NAME);
  addFields = this.getActionForChild(FIELD_TABLE_NAME);
  addInstantMessages = this.getActionForChild(INSTANTMESSAGE_TABLE_NAME);
  addNote = this.getActionForRelation(NOTE_TABLE_NAME, 'note');
  addPhoneNumbers = this.getActionForChild(PHONENUMBER_TABLE_NAME);
  addRelatedNames = this.getActionForChild(RELATEDNAME_TABLE_NAME);
  addRingtone = this.getActionForRelation(RINGTONE_TABLE_NAME, 'ringTone');
  addSocialProfiles = this.getActionForChild(SOCIALPROFILES_TABLE_NAME);
  addTexttone = this.getActionForRelation(TEXTTONE_TABLE_NAME, 'textTone');
  addUrls = this.getActionForChild(URL_TABLE_NAME);

  getActionForChild(tableName) {
    // Assumes no inter-dependencies
    return (contact, newChildren) => {
      return newChildren.map((newChild) => {
        return this.db.collections.get(tableName).prepareCreate((child) => {
          Object.entries(newChild).map(([key, value]) => {
            child[key] = value;
          });

          child.contact.set(contact);
        });
      });
    };
  }

  getActionForRelation(tableName) {
    // Assumes no inter-dependencies
    return (newRelation) => {
      return this.db.collections.get(tableName).prepareCreate((aRelation) => {
        Object.entries(newRelation).map(([key, value]) => {
          aRelation[key] = value;
        });
      });
    };
  }
}

const watermelonContactService = new WatermelonContactService();

export {watermelonContactService};
