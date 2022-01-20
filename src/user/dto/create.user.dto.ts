import {Min, Max , IsEmail, IsString} from 'class-validator'

export class UserDTO{
  
  @IsString()
  username:string;

  @IsEmail()
  email:string;

  @IsString()
  @Min(6)
  password:string

  
}
export class UserLoginDTO{
  
  @IsEmail()
  email:string;

  @IsString()
  @Min(6)
  password:string

  
}