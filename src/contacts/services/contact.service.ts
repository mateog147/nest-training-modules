import { Injectable } from '@nestjs/common';
import { Contact } from '../models/contact';
import { v4 as uuid } from 'uuid';
import { CreateContactDto } from '../models/create-contact.dto';
import { PatchContactDto } from '../models/patch-contact.dto';

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];
  constructor() {
    this.contacts.push({
      uuid: uuid(),
      userUuid: uuid(),
      name: 'Pedro',
      lastNames: 'Perez Peña',
      phone: '3011234568',
      email: 'pedro.perez@mail.com',
    });

    this.contacts.push({
      uuid: uuid(),
      userUuid: uuid(),
      name: 'Juan',
      lastNames: 'Aquino Vaca',
      phone: '32198876541',
      email: 'juan.aquino@mail.com',
    });
  }
  getAll(): Contact[] {
    return this.contacts;
  }

  getById(id: string): Contact | undefined {
    return this.contacts.find((contact) => contact.uuid == id);
  }

  create(data: CreateContactDto): Contact {
    this.contacts.push({
      uuid: uuid(),
      userUuid: data.userUuid,
      name: data.name,
      email: data.email,
      phone: data.phone,
      lastNames: data.lastNames,
    });
    return this.contacts[this.contacts.length - 1];
  }

  update(id: string, contactDto: CreateContactDto): Contact {
    const oldcontact: Contact | undefined = this.contacts.find(
      (contact) => contact.uuid == id,
    );
    if (oldcontact) {
      oldcontact.name = contactDto.name;
      oldcontact.lastNames = contactDto.lastNames;
      oldcontact.email = contactDto.email;
      oldcontact.userUuid = contactDto.userUuid;
      oldcontact.phone = contactDto.phone;
      return oldcontact;
    }
    return this.create(contactDto);
  }

  remove(uuid: string): boolean {
    const oldcontact: Contact | undefined = this.contacts.find(
      (contact) => contact.uuid == uuid,
    );
    if (oldcontact) {
      const index = this.contacts.indexOf(oldcontact);
      this.contacts.splice(index, 1);
      return true;
    }
    return false;
  }

  patch(uuid: string, contactDto: PatchContactDto): Contact | undefined {
    const oldcontact = this.contacts.find((contact) => contact.uuid == uuid);
    if (oldcontact) {
      const index = this.contacts.indexOf(oldcontact);
      const updatedContact = {
        ...oldcontact,
        ...contactDto,
      };
      this.contacts[index] = updatedContact;
      return updatedContact;
    }
    return undefined;
  }
}
