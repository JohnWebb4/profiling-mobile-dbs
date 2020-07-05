import {appSchema} from '@nozbe/watermelondb';
import {WatermelonContactTable} from './watermelonContact.model';

const schema = appSchema({
  version: 1,
  tables: [WatermelonContactTable],
});

export {schema};
