// @flow

export interface Contact {
  key: string;
  firstName: string;
  lastName: string;
  company: [{name: string}];
  emails: [
    {
      email: string,
    },
  ];
  phoneNumbers: [
    {
      number: string,
    },
  ];
  ringTone: {
    name: string,
  };
  textTone: {
    name: string,
  };
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
