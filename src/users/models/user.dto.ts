import { IsAlpha, IsEmail, IsNotEmpty, IsUUID, Length } from 'class-validator';
import { User } from '../interfaces/user';
export class UserDto implements User {
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @Length(2, 30)
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @Length(2, 30)
  @IsAlpha()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
