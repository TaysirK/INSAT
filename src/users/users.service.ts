import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,createQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginCredsDto } from './dto/login-creds.dto';
import { UserEntity } from './entities/user.entity';
import {JwtService} from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ){
  }

  //GET all users
  async getAllusers():Promise<UserEntity[]>{
    return await this.userRepository.find()
  }

  //ADD A User
  async addUser(user: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  //UPDATE A User
  async updateUser(id: string ,user: UpdateUserDto): Promise<UserEntity> {
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
  async getUser(id: string): Promise<UserEntity> {
    const qb = this.userRepository.createQueryBuilder("user");

    return await qb.where("user.id = :id", { id: id }).getOne();
  }

  //Register
  async register(userData: CreateUserDto ): Promise<Partial<UserEntity>>{
    const user = this.userRepository.create({
      ...userData
    });
    user.salt= await bcrypt.genSalt();
    user.password= await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch{
      throw new ConflictException('User can not be created');
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      filiere: user.filiere,
      niveau: user.niveau
    };
    
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


  }


}
