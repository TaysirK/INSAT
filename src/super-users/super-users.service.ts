import { Injectable } from '@nestjs/common';
import { CreateSuperUserDto } from './dto/create-super-user.dto';
import { UpdateSuperUserDto } from './dto/update-super-user.dto';
import {JwtService} from '@nestjs/jwt'
import { SuperUserEntity } from './entities/super-user.entity';
import { Repository,createQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt'
import { LoginCredsDto } from './dto/login-creds.dto';

@Injectable()
export class SuperUsersService {
  constructor(
    @InjectRepository(SuperUserEntity)
    private userRepository: Repository<SuperUserEntity>,
    private jwtService: JwtService
  ){
  }
    //GET all users
    async getAllusers():Promise<SuperUserEntity[]>{
      return await this.userRepository.find()
    }
    //UPDATE A User
    async updateUser(id: string ,user: UpdateSuperUserDto): Promise<SuperUserEntity> {
      const updatedUser= await this.userRepository.preload({
        id,
        ...user
      })
      if(!updatedUser){
        throw new NotFoundException("User doesn't exist");
      }
      return await this.userRepository.save(updatedUser)
    }
    //DELETE a user
    async deleteUser(id:string){
      return await this.userRepository.softDelete(id);
    }
    //RESTOORE A USER 
    async restoreUser(id:string){
        return this.userRepository.restore(id);
    }
     //GET a user
    async getUser(id: string): Promise<SuperUserEntity> {
      const qb = this.userRepository.createQueryBuilder("user");

      return await qb.where("user.id = :id", { id: id }).getOne();
    }
     //LOGIN
  async login(credentials: LoginCredsDto){
    const {email,password} = credentials; 
    const user = await this.userRepository.createQueryBuilder("user")
      .where("user.email= :email", { email }).getOne();

    console.log(user);
    if (!user) {
        throw new NotFoundException('user not found');
    }
    const hashedPassword= await bcrypt.hash(password, user.salt);
    if (hashedPassword==user.password){
      const payload={
        id: user.id
      };

      const jwt= await this.jwtService.sign(payload);
      return {
        "access_token": jwt,
        "status" : 1
      };
    }else{
      throw new NotFoundException('email or password not correct');
    }


}v


}
