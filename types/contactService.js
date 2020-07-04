// @flow

import {Contact} from './contact';

// JS Blasphemy
export interface ContactService {
  deleteAllContacts(): void;

  getContacts(): Contact[];

  writeXSampleContacts(count: number): void;
}
