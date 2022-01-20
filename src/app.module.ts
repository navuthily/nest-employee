import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { User } from './user/entity/User';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { jwtConstain } from './constains/secret';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'authentication',
      entities: [User],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env.local'
  }),
  JwtModule.register({
    secret:jwtConstain.secret,
    signOptions:{expiresIn:'1h'}
  }),

    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
