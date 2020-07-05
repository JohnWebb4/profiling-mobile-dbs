// @flow

import {Contact} from './contact';

// JS Blasphemy
export interface ContactService {
  close(): void;

  deleteAllContacts(): Promise<void>;

  getContacts(): Contact[];

  writeXSampleContacts(
    count: number,
    batchSize: number,
    batchInterval: Number,
    startIndex: number,
    cb: () => void,
  ): Promise<void>;
}
