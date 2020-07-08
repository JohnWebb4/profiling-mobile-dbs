const CONTACT_MODEL = 'Contact';

const RealmContact = {
  name: CONTACT_MODEL,
  properties: {
    key: 'string',
    firstName: 'string',
    lastName: 'string',
    company: 'Company[]',
    emails: 'Email[]',
    phoneNumbers: 'Phonenumber[]',
    ringTone: 'Ringtone',
    textTone: 'Ringtone',
    urls: 'Url[]',
    addresses: 'Address[]',
    birthdays: 'Date[]',
    dates: 'Date[]',
    relatedNames: 'string[]',
    socialProfiles: 'SocialProfile[]',
    instantMessages: 'SocialProfile[]',
    note: 'Note',
    fields: 'Field[]',
  },
};

const COMPANY_MODEL = 'Company';

const RealmCompany = {
  name: COMPANY_MODEL,
  properties: {
    name: 'string',
  },
};

const DATE_MODEL = 'Date';

const RealmDate = {
  name: DATE_MODEL,
  properties: {
    day: 'string',
    month: 'string',
    year: 'string',
  },
};

const EMAIL_MODEL = 'Email';

const RealmEmail = {
  name: EMAIL_MODEL,
  properties: {
    email: 'string',
  },
};

const FIELD_MODEL = 'Field';

const RealmField = {
  name: FIELD_MODEL,
  properties: {
    type: 'string',
  },
};

const NOTE_MODEL = 'Note';

const RealmNote = {
  name: NOTE_MODEL,
  properties: {
    text: 'string',
  },
};

const PHONENUMBER_MODEL = 'Phonenumber';

const RealmPhonenumber = {
  name: PHONENUMBER_MODEL,
  properties: {
    number: 'string',
  },
};

const RINGTONE_MODEL = 'Ringtone';

const RealmRingtone = {
  name: RINGTONE_MODEL,
  properties: {
    name: 'string',
  },
};

const SOCIAL_PROFILE_MODEL = 'SocialProfile';

const RealmSocialProfile = {
  name: SOCIAL_PROFILE_MODEL,
  properties: {
    username: 'string',
  },
};

const URL_MODEL = 'Url';

const RealmUrl = {
  name: URL_MODEL,
  properties: {
    url: 'string',
  },
};

export {
  CONTACT_MODEL,
  RealmContact,
  RealmCompany,
  RealmDate,
  RealmEmail,
  RealmField,
  RealmNote,
  RealmPhonenumber,
  RealmRingtone,
  RealmSocialProfile,
  RealmUrl,
};
