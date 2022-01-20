import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstain } from "src/constains/secret";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStretegy extends PassportStrategy(Strategy){

    constructor(private readonly userService:UserService){
       super({
         jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: jwtConstain.secret,
       })
    }

    async validate(payload:any){
      const {sub}= payload
      const user = await this.userService.getUser(sub)
      const { password, ...result } = user
      console.log(payload,'payload');
      
      return result
  }
  


}