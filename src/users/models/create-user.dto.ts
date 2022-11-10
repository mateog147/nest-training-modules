import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../interfaces/user';
export class CreateUserDto implements User {
  uuid?: string;
  @IsAlpha()
  @IsNotEmpty()
  name: string;
  @IsAlpha()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
