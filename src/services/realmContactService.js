import Realm from 'realm';

import {Contact} from '../types/contact';
import {
  performanceService,
  PERFOMANCE_EVENTS,
} from '../services/performanceService';
import {ContactService} from '../types/contactService';
import {
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
} from '../realmModels/realmContact.model';
import {generateContact} from '../utils/contactGenerator';
import {InteractionManager} from 'react-native';

class RealmContactService implements ContactService {
  realm;

  constructor() {
    Realm.open({
      deleteRealmIfMigrationNeeded: true,
      schemaVersion: 1,
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
      this.realm.delete(this.realm.objects(RealmContact.name));
    });
  }

  getContacts(): Contact[] {
    return this.realm.objects(RealmContact.name);
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
        const contact: Contact = generateContact(index);

        const realmAddresses = contact.addresses.map((address) =>
          this.realm.create(RealmAddress.name, address, true),
        );

        const realmBirthdays = contact.birthdays.map((birthday) =>
          this.realm.create(RealmDate.name, birthday, true),
        );

        const realmCompany =
          contact.company &&
          this.realm.create(RealmCompany.name, contact.company);

        const realmDates = contact.dates.map((date) =>
          this.realm.create(RealmDate.name, date, true),
        );

        const realmEmails = contact.emails.map((email) =>
          this.realm.create(RealmEmail.name, email, true),
        );

        const realmFields = contact.fields.map((field) =>
          this.realm.create(RealmField.name, field, true),
        );

        const realmInstantMessages = contact.instantMessages.map(
          (instantMessage) =>
            this.realm.create(RealmSocialProfile.name, instantMessage, true),
        );

        const realmRelatedNames = contact.relatedNames.map((relatedName) =>
          this.realm.create(RealmRelatedName.name, relatedName, true),
        );

        const realmNote =
          contact.note && this.realm.create(RealmNote.name, contact.note, true);

        const realmPhoneNumbers = contact.phoneNumbers.map((phoneNumber) =>
          this.realm.create(RealmPhonenumber.name, phoneNumber, true),
        );

        const realmRingtone = this.realm.create(
          RealmRingtone.name,
          contact.ringTone,
          true,
        );

        const realmSocialProfiles = contact.socialProfiles.map(
          (socialProfile) =>
            this.realm.create(RealmSocialProfile.name, socialProfile, true),
        );

        const realmTexttone = this.realm.create(
          RealmRingtone.name,
          contact.textTone,
          true,
        );

        const realmUrls = contact.urls.map((url) =>
          this.realm.create(RealmUrl.name, url, true),
        );

        const actualContact: Contact = {
          key: contact.key,
          addresses: realmAddresses,
          birthdays: realmBirthdays,
          company: realmCompany,
          dates: realmDates,
          emails: realmEmails,
          fields: realmFields,
          instantMessages: realmInstantMessages,
          firstName: contact.firstName,
          lastName: contact.lastName,
          note: realmNote,
          phoneNumbers: realmPhoneNumbers,
          relatedNames: realmRelatedNames,
          ringTone: realmRingtone,
          socialProfiles: realmSocialProfiles,
          textTone: realmTexttone,
          urls: realmUrls,
        };

        this.realm.create(RealmContact.name, actualContact, 'all');

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
