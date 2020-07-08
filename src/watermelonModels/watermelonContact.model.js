import {tableSchema, Model} from '@nozbe/watermelondb';
import {field, children, relation} from '@nozbe/watermelondb/decorators';

const CONTACT_TABLE_NAME = 'contacts';

class WatermelonContact extends Model {
  static table = CONTACT_TABLE_NAME;

  static associations = {
    emails: {type: 'has_many', foreignKey: 'contact_id'}
  };

  @field('key') key;
  @field('firstName') firstName;
  @field('lastName') lastName;
  @relation(COMPANY_TABLE_NAME, 'company_id') company;
  @children('emails') emails;

  // Continue from here

  @children('phoneNumbers' phoneNumbers;
  @field('ringTone') ringTone;
  @field('textTone') textTone;
  urls: [
    {
      url: string,
    },
  ];
  addresses: [
    {
      address: string,
    },
  ];
  birthdays: [
    {
      day: string,
      month: string,
      year: string,
    },
  ];
  dates: [
    {
      day: string,
      month: string,
      year: string,
    },
  ];
  relatedNames: [string];
  socialProfiles: [
    {
      username: string,
    },
  ];
  instantMessages: [
    {
      username: string,
    },
  ];
  note: {
    text: string,
  };
  fields: [
    {
      type: string,
    },
  ];
}

const WatermelonContactTable = tableSchema({
  name: CONTACT_TABLE_NAME,
  columns: [
    {name: 'key', type: 'string'},
    {name: 'firstName', type: 'string'},
    {name: 'lastName', type: 'string'},
    {name: 'company', type: COMPANY_TABLE_NAME},
    {name: 'email', type: EMAIL}
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

const EMAIL_TABLE_NAME = 'emails';

class WatermelonEmail extends Model {
  static table = EMAIL_TABLE_NAME;

  static associations = {
    contacts: {type: 'belongs_to', foreignKey: 'contact_id'}
  }

  @field('email') email;
}

const WatermelonEmailTable = tableSchema({
  name: EMAIL_TABLE_NAME,
  columns: [{name: 'email', type: 'string'}],
});

const PHONENUMBER_TABLE_NAME = 'phonenumbers';

class WatermelonPhonenumber extends Model {
  static table = PHONENUMBER_TABLE_NAME;

  @field('number') number;
}

const WatermelonPhonenumberTable = tableSchema({
  name: PHONENUMBER_TABLE_NAME,
  columns: [{name: 'number', type: 'string'}]
});

const RINGTONE_TABLE_NAME = 'ringtones';

class WatermelonRingtone extends Model {
  static table = RINGTONE_TABLE_NAME;

  @field('name') name;
}

class WatermelonRingtoneTable = tableSchema({
  name: RINGTONE_TABLE_NAME,
  columns: [{ name: 'name', type: 'string'}]
})

export {
  CONTACT_TABLE_NAME,
  WatermelonContact,
  WatermelonContactTable,

  COMPANY_TABLE_NAME,
  WatermelonCompany,
  WatermelonCompanyTable,

  EMAIL_TABLE_NAME,
  WatermelonEmail,
  WatermelonEmailTable,

  PHONENUMBER_TABLE_NAME,
  WatermelonPhonenumber,
  WatermelonPhonenumberTable,

  RINGTONE_TABLE_NAME,
  WatermelonRingtone,
  WatermelonRingtoneTable,
};
