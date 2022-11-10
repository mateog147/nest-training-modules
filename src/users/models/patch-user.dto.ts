import { IsUUID, IsAlpha, IsEmail, IsOptional } from 'class-validator';

export class PatchUserDto {
  @IsOptional()
  @IsUUID()
  uuid?: string;
  @IsOptional()
  @IsAlpha()
  name?: string;
  @IsOptional()
  @IsAlpha()
  lastName?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
}
