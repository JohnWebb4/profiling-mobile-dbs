import {tableSchema, Model} from '@nozbe/watermelondb';
import {field, action} from '@nozbe/watermelondb/decorators';

const CONTACT_TABLE_NAME = 'contact';

class WatermelonContact extends Model {
  static table = CONTACT_TABLE_NAME;

  @field('name') name;
  @field('key') key;
}

const WatermelonContactTable = tableSchema({
  name: CONTACT_TABLE_NAME,
  columns: [
    {name: 'key', type: 'string'},
    {name: 'name', type: 'string'},
  ],
});

export {CONTACT_TABLE_NAME, WatermelonContact, WatermelonContactTable};
