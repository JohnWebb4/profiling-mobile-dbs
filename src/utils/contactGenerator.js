// @flow
import {sampleAddresses} from './samples/sampleAddresses';
import {sampleDates} from './samples/sampleDates';
import {sampleCompanies} from './samples/sampleCompanies';
import {sampleEmails} from './samples/sampleEmails';
import {sampleNames} from './samples/sampleNames';
import {sampleFields} from './samples/sampleFields';
import {sampleNotes} from './samples/sampleNotes';
import {samplePhoneNumbers} from './samples/samplePhoneNumbers';
import {sampleRingtones} from './samples/sampleRingtones';
import {sampleSocialProfiles} from './samples/sampleSocialProfiles';
import {sampleUrls} from './samples/sampleUrls';

function generateContact(key: number) {
  return {
    key: String(key),
    firstName: getFirstName(key),
    lastName: getLastName(key),
    company: getCompany(key),
    emails: getEmails(key),
    phoneNumbers: getPhoneNumbers(key),
    ringTone: getRingTone(key),
    textTone: getTextTone(key),
    urls: getUrls(key),
    addresses: getAddresses(key),
    birthdays: getBirthdays(key),
    dates: getDates(key),
    relatedNames: getRelatedNames(key),
    socialProfiles: getSocialProfiles(key),
    instantMessages: getInstantMessages(key),
    note: getNote(key),
    fields: getFields(key),
  };
}

let getFirstName = getRandomElementGenerator(sampleNames);
let getLastName = getRandomElementGenerator(sampleNames);
let getCompany = getRandomElementGenerator(sampleCompanies);
let getNote = getRandomElementGenerator(sampleNotes);
let getRingTone = getRandomElementGenerator(sampleRingtones);
let getTextTone = getRandomElementGenerator(sampleRingtones);

let getAddresses = getRandomElementsGenerator(sampleAddresses);
let getBirthdays = getRandomElementsGenerator(sampleDates);
let getDates = getRandomElementsGenerator(sampleDates);
let getEmails = getRandomElementsGenerator(sampleEmails);
let getFields = getRandomElementsGenerator(sampleFields);
let getPhoneNumbers = getRandomElementsGenerator(samplePhoneNumbers);
let getRelatedNames = getRandomElementsGenerator(
  sampleNames.map((name) => ({
    name,
  })),
);
let getSocialProfiles = getRandomElementsGenerator(sampleSocialProfiles);
let getInstantMessages = getRandomElementsGenerator(sampleSocialProfiles);
let getUrls = getRandomElementsGenerator(sampleUrls);

function getRandomElementGenerator(samples) {
  return function () {
    return getRandomElementsGenerator(samples, 1, 1)()[0];
  };
}

function getRandomElementsGenerator(samples, maxCount, minCount = 0) {
  return function generator() {
    const elements = [];
    const count = getRandomIndex(maxCount || samples.length, minCount);

    for (let i = 0; i < count; i++) {
      const randomIndex = getRandomIndex(samples.length);
      elements.push(samples[randomIndex]);
    }

    return elements;
  };
}

function getRandomIndex(max, min = 0) {
  const dist = max - min;

  return Math.floor(Math.random() * dist + min);
}

export {generateContact};
