import {appSchema} from '@nozbe/watermelondb';
import {
  WatermelonAddressTable,
  WatermelonBirthdayTable,
  WatermelonContactTable,
  WatermelonCompanyTable,
  WatermelonDateTable,
  WatermelonEmailTable,
  WatermelonFieldTable,
  WatermelonInstantMessagesTable,
  WatermelonNoteTable,
  WatermelonPhonenumberTable,
  WatermelonRelatednameTable,
  WatermelonRingtoneTable,
  WatermelonSocialProfileTable,
  WatermelonUrlTable,
  WatermelonTexttoneTable,
} from './watermelonContact.model';

const schema = appSchema({
  version: 1,
  tables: [
    WatermelonAddressTable,
    WatermelonBirthdayTable,
    WatermelonContactTable,
    WatermelonCompanyTable,
    WatermelonDateTable,
    WatermelonEmailTable,
    WatermelonFieldTable,
    WatermelonInstantMessagesTable,
    WatermelonNoteTable,
    WatermelonPhonenumberTable,
    WatermelonRelatednameTable,
    WatermelonRingtoneTable,
    WatermelonSocialProfileTable,
    WatermelonTexttoneTable,
    WatermelonUrlTable,
  ],
});

export {schema};
