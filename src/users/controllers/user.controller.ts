import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/create-user.dto';
import { PatchUserDto } from '../models/patch-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  getAllUsers(): User[] {
    return this.userService.getAll();
  }

  @Get(':uuid')
  getUserByUid(@Param('uuid') uuid: string): User {
    return (
      this.userService.getById(uuid) ?? {
        uuid: '',
        name: '',
        lastName: '',
        email: '',
      }
    );
  }

  @Post()
  addNewUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Put(':uuid')
  editExistingUser(
    @Param('uuid') uuid: string,
    @Body() userDto: CreateUserDto,
  ): User {
    return this.userService.update(uuid, userDto);
  }

  @Delete(':uuid')
  removeUser(@Param('uuid') uuid: string): boolean {
    return this.userService.remove(uuid);
  }

  @Patch(':uuid')
  updateUserInfo(
    @Param('uuid') uuid: string,
    @Body() userDto: PatchUserDto,
  ): User {
    return (
      this.userService.patch(uuid, userDto) ?? {
        uuid: '',
        name: '',
        lastName: '',
        email: '',
      }
    );
  }
}
