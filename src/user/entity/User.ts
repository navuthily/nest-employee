import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate}  from 'typeorm'
import {hash, genSalt} from 'bcryptjs'
import { Role } from 'src/role.enum';

@Entity('users')
export class User {
   
  @PrimaryGeneratedColumn()
  id:number

  @Column({type:'varchar', length:50})
  username:string;

  @Column({type:'varchar', length:255, unique:true, nullable:false})
  email:string;

  @Column({type:'varchar', length:255, unique:true, nullable:false})
  password:string

  @Column({type:'varchar', length:50, default:'active'})
  status: string
  
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn({type:'timestamp',name:'created_at'})
  created:Date

  @UpdateDateColumn({type:'timestamp',name:'updated_at'})
  update:Date

  @BeforeInsert()
  @BeforeUpdate()
   async encryptPassword(){
    if(!this.password){
      return;
    }
    const salt =  await genSalt(10)
    return this.password = await  hash(this.password, salt)
 }
}