const RealmAddress = {
  name: 'Address',
  properties: {
    address: 'string',
  },
};

const RealmCompany = {
  name: 'Company',
  properties: {
    name: 'string',
  },
};

const RealmDate = {
  name: 'SMDate',
  properties: {
    day: 'string',
    month: 'string',
    year: 'string',
  },
};

const RealmEmail = {
  name: 'Email',
  properties: {
    email: 'string',
  },
};

const RealmField = {
  name: 'Field',
  properties: {
    type: 'string',
  },
};

const RealmNote = {
  name: 'Note',
  properties: {
    text: 'string',
  },
};

const RealmPhonenumber = {
  name: 'Phonenumber',
  properties: {
    number: 'string',
  },
};

const RealmRelatedName = {
  name: 'RelatedName',
  properties: {
    name: 'string',
  },
};

const RealmRingtone = {
  name: 'Ringtone',
  properties: {
    name: 'string',
  },
};

const RealmSocialProfile = {
  name: 'SocialProfile',
  properties: {
    username: 'string',
  },
};

const RealmUrl = {
  name: 'Url',
  properties: {
    url: 'string',
  },
};

const RealmContact = {
  name: 'Contact',
  primaryKey: 'key',
  properties: {
    addresses: `${RealmAddress.name}[]`,
    birthdays: `${RealmDate.name}[]`,
    company: `${RealmCompany.name}`,
    dates: `${RealmDate.name}[]`,
    emails: `${RealmEmail.name}[]`,
    fields: `${RealmField.name}[]`,
    firstName: 'string',
    instantMessages: `${RealmSocialProfile.name}[]`,
    key: 'string',
    lastName: 'string',
    note: `${RealmNote.name}`,
    phoneNumbers: `${RealmPhonenumber.name}[]`,
    relatedNames: `${RealmRelatedName.name}[]`,
    ringTone: `${RealmRingtone.name}`,
    socialProfiles: `${RealmSocialProfile.name}[]`,
    textTone: `${RealmRingtone.name}`,
    urls: `${RealmUrl.name}[]`,
  },
};

export {
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
};
