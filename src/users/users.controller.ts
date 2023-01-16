import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private  usersService: UsersService
    ) {}

  //register
  @Post()
  async register(
    @Body() userData: CreateUserDto
  ):Promise<Partial<UserEntity>> {
    return await this.usersService.register(userData)
  }

  //GET all users
  @Get()
  async getAllusers(): Promise<UserEntity[]>{
    return await this.usersService.getAllusers();
  }
  //ADD a user
  @Post()
  async addUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.addUser(user);
  }

  //GET a user with id 
  @Get(':id')
  async getUser(
    @Param('id') id: string): Promise<UserEntity>
   {
    return await this.usersService.getUser(id) ; 
  }

  //Update A user
  @Patch(':id')
  async updateUser(
    @Body() user: UpdateUserDto,
    @Param('id') id: string
  ): Promise<UserEntity> {
    return this.usersService.updateUser(id,user);
  }

  //DELETE A user
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string
  ){
    return await this.usersService.deleteUser(id);
  }
  //RESTOORE A USER 
  @Get('restore/:id')
  async restoreUser(
    @Param('id') id: string
  ){
    return await this.usersService.restoreUser(id);
  }

  




}
