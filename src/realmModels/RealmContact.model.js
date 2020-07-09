const CONTACT_MODEL = 'Contact';

const RealmContact = {
  name: CONTACT_MODEL,
  properties: {
    addresses: 'Address[]',
    birthdays: 'Date[]',
    company: 'Company',
    dates: 'Date[]',
    emails: 'Email[]',
    fields: 'Field[]',
    firstName: 'string',
    instantMessages: 'SocialProfile[]',
    key: 'string',
    lastName: 'string',
    note: 'Note',
    phoneNumbers: 'Phonenumber[]',
    relatedNames: 'RelatedName[]',
    ringTone: 'Ringtone',
    socialProfiles: 'SocialProfile[]',
    textTone: 'Ringtone',
    urls: 'Url[]',
  },
};

const ADDRESS_MODEL = 'Address';

const RealmAddress = {
  name: ADDRESS_MODEL,
  properties: {
    address: 'string',
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

const RELATEDNAME_MODEL = 'RelatedName';

const RealmRelatedName = {
  name: RELATEDNAME_MODEL,
  properties: {
    name: 'string',
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
  ADDRESS_MODEL,
  RealmAddress,
  COMPANY_MODEL,
  RealmCompany,
  CONTACT_MODEL,
  RealmContact,
  DATE_MODEL,
  RealmDate,
  EMAIL_MODEL,
  RealmEmail,
  FIELD_MODEL,
  RealmField,
  NOTE_MODEL,
  RealmNote,
  PHONENUMBER_MODEL,
  RealmPhonenumber,
  RELATEDNAME_MODEL,
  RealmRelatedName,
  RINGTONE_MODEL,
  RealmRingtone,
  SOCIAL_PROFILE_MODEL,
  RealmSocialProfile,
  URL_MODEL,
  RealmUrl,
};
