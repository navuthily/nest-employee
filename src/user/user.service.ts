import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import { User } from './entity/User';
import { UserDTO } from './dto/create.user.dto';
@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userReposity:Repository<User>){

  }

 async getAll(){
    return await this.userReposity.find();
  }

  async getUser(id:number){
    const user =  await this.userReposity.findOne(id);
    if(!user) throw new NotFoundException('user not found')
    return user
  }

  async createUser(dto:UserDTO){
     const user = await this.userReposity.findOne({email:dto.email});
     if(user) throw new BadRequestException('email al ready exist')
     const userCreate = await this.userReposity.create(dto);
     const usersave = await this.userReposity.save(userCreate)
     delete usersave.password
     return usersave
  }

   
    async findOneUser(email:string){
      return await this.userReposity.findOne({email})
    }
}
