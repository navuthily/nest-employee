import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstain } from 'src/constains/secret';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStretegy } from './strategy/jwtStrategy';
import { localStrategy } from './strategy/localStrategy';
 
@Module({
  imports:[PassportModule, UserModule,
    JwtModule.register({
      secret:jwtConstain.secret,
      signOptions:{expiresIn:'1h'}
    })
  
  ],
  controllers: [AuthController],
  providers:[AuthService, localStrategy, JwtStretegy],
  exports:[AuthService]
})
export class AuthModule {}
