import {tableSchema, Model} from '@nozbe/watermelondb';
import {
  field,
  children,
  relation,
  action,
} from '@nozbe/watermelondb/decorators';

const CONTACT_TABLE_NAME = 'contacts';

class WatermelonContact extends Model {
  static table = CONTACT_TABLE_NAME;

  static associations = {
    addresses: {type: 'has_many', foreignKey: 'contact_id'},
    birthdays: {type: 'has_many', foreignKey: 'contact_id'},
    dates: {type: 'has_many', foreignKey: 'contact_id'},
    emails: {type: 'has_many', foreignKey: 'contact_id'},
    fields: {type: 'has_many', foreignKey: 'contact_id'},
    instantMessages: {type: 'has_many', foreignKey: 'contact_id'},
    phoneNumbers: {type: 'has_many', foreignKey: 'contact_id'},
    relatedNames: {type: 'has_many', foreignKey: 'contact_id'},
    socialProfiles: {type: 'has_many', foreignKey: 'contact_id'},
    urls: {type: 'has_many', foreignKey: 'contact_id'},
  };

  @field('key') key;
  @children('addresses') addresses;
  @children('birthdays') birthdays;
  @relation(COMPANY_TABLE_NAME, 'company_id') company;
  @children('dates') dates;
  @children('emails') emails;
  @children('fields') fields;
  @field('firstName') firstName;
  @children('instantMessages') instantMessages;
  @field('lastName') lastName;
  @relation(NOTE_TABLE_NAME, 'note_id') note;
  @children('phoneNumbers') phoneNumbers;
  @children('relatedNames') relatedNames;
  @relation(RINGTONE_TABLE_NAME, 'ringtone_id') ringTone;
  @children('socialProfiles') socialProfiles;
  @relation(TEXTTONE_TABLE_NAME, 'texttone_id') textTone;
  @children('urls') urls;

  @action addAddresses = this.getActionForChild(ADDRESS_TABLE_NAME);
  @action addBirthdays = this.getActionForChild(BIRTHDAY_TABLE_NAME);
  @action addCompany = this.getActionForRelation(COMPANY_TABLE_NAME, 'company');
  @action addDates = this.getActionForChild(DATE_TABLE_NAME);
  @action addEmails = this.getActionForChild(EMAIL_TABLE_NAME);
  @action addFields = this.getActionForChild(FIELD_TABLE_NAME);
  @action addInstantMessages = this.getActionForChild(
    INSTANTMESSAGE_TABLE_NAME,
  );
  @action addNote = this.getActionForRelation(NOTE_TABLE_NAME, 'note');
  @action addPhoneNumbers = this.getActionForChild(PHONENUMBER_TABLE_NAME);
  @action addRelatedNames = this.getActionForChild(RELATEDNAME_TABLE_NAME);
  @action addRingtone = this.getActionForRelation(
    RINGTONE_TABLE_NAME,
    'ringTone',
  );
  @action addSocialProfiles = this.getActionForChild(SOCIALPROFILES_TABLE_NAME);
  @action addTexttone = this.getActionForRelation(
    TEXTTONE_TABLE_NAME,
    'textTone',
  );
  @action addUrls = this.getActionForChild(URL_TABLE_NAME);

  getActionForChild(tableName) {
    // Assumes no inter-dependencies
    return async (newChildren) => {
      return await Promise.all(
        newChildren.map((newChild) => {
          return this.collections.get(tableName).create((child) => {
            child.contact_id = this.id;

            Object.entries(newChild).map(([key, value]) => {
              child[key] = value;
            });
          });
        }),
      );
    };
  }

  getActionForRelation(tableName, contactKey) {
    // Assumes no inter-dependencies
    return async (newRelation) => {
      return await this.collections.get(tableName).create((aRelation) => {
        this[contactKey].set(aRelation);

        Object.entries(newRelation).map(([key, value]) => {
          aRelation[key] = value;
        });
      });
    };
  }
}

const WatermelonContactTable = tableSchema({
  name: CONTACT_TABLE_NAME,
  columns: [
    {name: 'company_id', type: 'string'},
    {name: 'firstName', type: 'string'},
    {name: 'key', type: 'string'},
    {name: 'lastName', type: 'string'},
    {name: 'note_id', type: 'string'},
    {name: 'ringtone_id', type: 'string'},
    {name: 'texttone_id', type: 'string'},
  ],
});

const ADDRESS_TABLE_NAME = 'addresses';

class WatermelonAddress extends Model {
  static table = ADDRESS_TABLE_NAME;
  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('address') address;
}

const WatermelonAddressTable = tableSchema({
  name: ADDRESS_TABLE_NAME,
  columns: [
    {name: 'address', type: 'string'},
    {name: 'contact_id', type: 'string'},
  ],
});

const BIRTHDAY_TABLE_NAME = 'birthdays';

class WatermelonBirthday extends Model {
  static table = BIRTHDAY_TABLE_NAME;
  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('day') day;
  @field('month') month;
  @field('year') year;
}

const WatermelonBirthdayTable = tableSchema({
  name: BIRTHDAY_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'day', type: 'string'},
    {name: 'month', type: 'string'},
    {name: 'year', type: 'string'},
  ],
});

const COMPANY_TABLE_NAME = 'companies';

class WatermelonCompany extends Model {
  static table = COMPANY_TABLE_NAME;

  @field('name') name;
}

const WatermelonCompanyTable = tableSchema({
  name: COMPANY_TABLE_NAME,
  columns: [{name: 'name', type: 'string'}],
});

const DATE_TABLE_NAME = 'dates';

class WatermelonDate extends Model {
  static table = DATE_TABLE_NAME;
  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('day') day;
  @field('month') month;
  @field('year') year;
}

const WatermelonDateTable = tableSchema({
  name: DATE_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'day', type: 'string'},
    {name: 'month', type: 'string'},
    {name: 'year', type: 'string'},
  ],
});

const EMAIL_TABLE_NAME = 'emails';

class WatermelonEmail extends Model {
  static table = EMAIL_TABLE_NAME;

  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('email') email;
}

const WatermelonEmailTable = tableSchema({
  name: EMAIL_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'email', type: 'string'},
  ],
});

const FIELD_TABLE_NAME = 'fields';

class WatermelonField extends Model {
  static table = FIELD_TABLE_NAME;

  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('type') type;
}

const WatermelonFieldTable = tableSchema({
  name: FIELD_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'type', type: 'string'},
  ],
});

const INSTANTMESSAGE_TABLE_NAME = 'instantmessages';

class WatermelonInstantMessages extends Model {
  static table = INSTANTMESSAGE_TABLE_NAME;

  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('username') username;
}

const WatermelonInstantMessagesTable = tableSchema({
  name: INSTANTMESSAGE_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'username', type: 'string'},
  ],
});

const NOTE_TABLE_NAME = 'notes';

class WatermelonNote extends Model {
  static table = NOTE_TABLE_NAME;

  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('text') text;
}

const WatermelonNoteTable = tableSchema({
  name: NOTE_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'text', type: 'string'},
  ],
});

const PHONENUMBER_TABLE_NAME = 'phonenumbers';

class WatermelonPhonenumber extends Model {
  static table = PHONENUMBER_TABLE_NAME;

  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('number') number;
}

const WatermelonPhonenumberTable = tableSchema({
  name: PHONENUMBER_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'number', type: 'string'},
  ],
});

const RELATEDNAME_TABLE_NAME = 'relatedNames';

class WatermelonRelatedname extends Model {
  static table = RELATEDNAME_TABLE_NAME;
  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('name') name;
}

const WatermelonRelatednameTable = tableSchema({
  name: RELATEDNAME_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'name', type: 'string'},
  ],
});

const RINGTONE_TABLE_NAME = 'ringtones';

class WatermelonRingtone extends Model {
  static table = RINGTONE_TABLE_NAME;

  @field('name') name;
}

const WatermelonRingtoneTable = tableSchema({
  name: RINGTONE_TABLE_NAME,
  columns: [{name: 'name', type: 'string'}],
});

const SOCIALPROFILES_TABLE_NAME = 'socialProfiles';

class WatermelonSocialProfile extends Model {
  static table = SOCIALPROFILES_TABLE_NAME;
  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('username') username;
}

const WatermelonSocialProfileTable = tableSchema({
  name: SOCIALPROFILES_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'username', type: 'string'},
  ],
});

const TEXTTONE_TABLE_NAME = 'texttones';

class WatermelonTexttone extends Model {
  static table = TEXTTONE_TABLE_NAME;

  @field('name') name;
}

const WatermelonTexttoneTable = tableSchema({
  name: TEXTTONE_TABLE_NAME,
  columns: [{name: 'name', type: 'string'}],
});

const URL_TABLE_NAME = 'urls';

class WatermelonUrl extends Model {
  static table = URL_TABLE_NAME;

  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'},
  };

  @field('url') url;
}

const WatermelonUrlTable = tableSchema({
  name: URL_TABLE_NAME,
  columns: [
    {name: 'contact_id', type: 'string'},
    {name: 'url', type: 'string'},
  ],
});

export {
  ADDRESS_TABLE_NAME,
  WatermelonAddress,
  WatermelonAddressTable,
  BIRTHDAY_TABLE_NAME,
  WatermelonBirthday,
  WatermelonBirthdayTable,
  CONTACT_TABLE_NAME,
  WatermelonContact,
  WatermelonContactTable,
  COMPANY_TABLE_NAME,
  WatermelonCompany,
  WatermelonCompanyTable,
  DATE_TABLE_NAME,
  WatermelonDate,
  WatermelonDateTable,
  EMAIL_TABLE_NAME,
  WatermelonEmail,
  WatermelonEmailTable,
  FIELD_TABLE_NAME,
  WatermelonField,
  WatermelonFieldTable,
  INSTANTMESSAGE_TABLE_NAME,
  WatermelonInstantMessages,
  WatermelonInstantMessagesTable,
  NOTE_TABLE_NAME,
  WatermelonNote,
  WatermelonNoteTable,
  PHONENUMBER_TABLE_NAME,
  WatermelonPhonenumber,
  WatermelonPhonenumberTable,
  RELATEDNAME_TABLE_NAME,
  WatermelonRelatedname,
  WatermelonRelatednameTable,
  RINGTONE_TABLE_NAME,
  WatermelonRingtone,
  WatermelonRingtoneTable,
  SOCIALPROFILES_TABLE_NAME,
  WatermelonSocialProfile,
  WatermelonSocialProfileTable,
  TEXTTONE_TABLE_NAME,
  WatermelonTexttone,
  WatermelonTexttoneTable,
  URL_TABLE_NAME,
  WatermelonUrl,
  WatermelonUrlTable,
};
