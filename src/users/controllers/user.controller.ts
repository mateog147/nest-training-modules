import { TransformInterceptor } from './../../interceptors/transform.interceptor';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/create-user.dto';
import { PatchUserDto } from '../models/patch-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  getAllUsers(): User[] {
    return this.userService.getAll();
  }

  @Get(':uuid')
  getUserByUid(@Param('uuid') uuid: string): User {
    const user: User | undefined = this.userService.getById(uuid);
    if (user) {
      return user;
    }
    throw new HttpException('user id not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  addNewUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Put(':uuid')
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
    }),
  )
  editExistingUser(
    @Param('uuid') uuid: string,
    @Body() userDto: CreateUserDto,
  ): User {
    return this.userService.update(uuid, userDto);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  removeUser(@Param('uuid') uuid: string): boolean {
    return this.userService.remove(uuid);
  }

  @Patch(':uuid')
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: () =>
        new BadRequestException('Los datos suministrados son invalidos'),
    }),
  )
  updateUserInfo(
    @Param('uuid') uuid: string,
    @Body() userDto: PatchUserDto,
  ): User {
    const user: User | undefined = this.userService.patch(uuid, userDto);
    if (user) {
      return user;
    }
    throw new HttpException('user id not found', HttpStatus.NOT_FOUND);
  }
}
