import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDTO } from './dto/create.user.dto';
import { Role } from 'src/role.enum';
import { Roles } from 'src/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/role.guard';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()   
  async getAllUser() {
    const users = await this.userService.getAll();
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  @Get(':id')
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()  
  async getOneUser(@Param('id') id:number) {
    console.log(id,'ko cos id');
    
    const users = await this.userService.getUser(id);
    console.log('user', users);
    
    delete users.password;
    return users;
  }

  @Post()
  async createUser(@Body() dto: UserDTO) {
    const user = await this.userService.createUser(dto);
    return { user };
  }
  
}
