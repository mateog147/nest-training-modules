import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  getMessage(): string {
    return 'Hola desde el servicio de Contacts';
  }
}
