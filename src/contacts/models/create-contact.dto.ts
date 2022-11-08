import { Contact } from './contact';
export class CreateContactDto implements Contact {
  uuid: string;
  userUuid: string;
  name: string;
  lastNames: string;
  phone: string;
  email: string;

  constructor(data: Contact) {
    this.uuid = data.uuid ?? '';
  }
}
