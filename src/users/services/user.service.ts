import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMessage(): string {
    return 'Hola desde el servicio de Users';
  }
}
