import { User } from './user';
export class CreateUserDto implements User {
  uuid: string;
  name: string;
  lastName: string;
  email: string;
  constructor(data: User) {
    this.uuid = data.uuid ?? '';
  }
}
