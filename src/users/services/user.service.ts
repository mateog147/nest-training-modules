import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../models/create-user.dto';
import { PatchUserDto } from '../models/patch-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];
  constructor() {
    this.users.push({
      uuid: uuid(),
      name: 'Pedro',
      lastName: 'Perez',
      email: 'pedro.perez@mail.com',
    });
    this.users.push({
      uuid: uuid(),
      name: 'Valentina',
      lastName: 'Tereshkova',
      email: 'valentina@mail.com',
    });
    this.users.push({
      uuid: uuid(),
      name: 'Juan',
      lastName: 'Aquino',
      email: 'juan.aquino@mail.com',
    });
  }
  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User | undefined {
    return this.users.find((user) => user.uuid == id);
  }

  create(data: CreateUserDto): User {
    this.users.push({
      uuid: uuid(),
      name: data.name,
      email: data.email,
      lastName: data.lastName,
    });
    return this.users[this.users.length - 1];
  }

  update(id: string, userDto: CreateUserDto): User {
    const oldUser: User | undefined = this.users.find(
      (user) => user.uuid == id,
    );
    if (oldUser) {
      oldUser.name = userDto.name;
      oldUser.lastName = userDto.lastName;
      oldUser.email = userDto.email;
      return oldUser;
    }
    return this.create(userDto);
  }

  remove(uuid: string): boolean {
    const oldUser: User | undefined = this.users.find(
      (user) => user.uuid == uuid,
    );
    if (oldUser) {
      const index = this.users.indexOf(oldUser);
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  patch(uuid: string, userDto: PatchUserDto): User | undefined {
    const oldUser = this.users.find((user) => user.uuid == uuid);
    if (oldUser) {
      const index = this.users.indexOf(oldUser);
      const updatedUser = {
        ...oldUser,
        ...userDto,
      };
      this.users[index] = updatedUser;
      return updatedUser;
    }
    return undefined;
  }
}
