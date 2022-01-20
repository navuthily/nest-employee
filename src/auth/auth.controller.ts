import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/role.enum';
import { RolesGuard } from 'src/role.guard';
import { Roles } from 'src/roles.decorator';
import { UserLoginDTO } from 'src/user/dto/create.user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() dto: UserLoginDTO) {
   //   console.log(dto)
    const data = await this.authService.login(req.user);
    return {
      message: 'exitoso',
      data,
    };
  }


  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
