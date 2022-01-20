import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {compare} from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

   constructor(private readonly userService:UserService, private readonly jwtService: JwtService){

   }
     
  async validateUser(email:string, pass:string){
     const user = await this.userService.findOneUser(email)
     if(user &&  await compare(pass , user.password)){
        const { password, ...result } = user
      //   console.log(result,'nef');
        
        return result;
     }
   //   console.log('nothing');
     
     return null;
   }


   login(user:any){
      const {id, ...result } = user
      return {
         ...result,
         access_token: this.jwtService.sign({id:id})
      }
      }
   
}
