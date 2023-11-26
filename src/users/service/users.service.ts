import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { IUser } from '../interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel:Model<IUser>) { }
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
 }
 
 async findAllUsers(): Promise<IUser[]> {
  const userData = await this.userModel.find();
  if (!userData || userData.length == 0) {
      throw new NotFoundException('Users data not found!');
  }
  return userData;
}
  async findUser(userId: number) : Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
     throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
 }
 

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await        this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
   if (!existingUser) {
     throw new NotFoundException(`User #${userId} not found`);
   }
   return existingUser;
}

async removeUser(userId: number) : Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
   if (!deletedUser) {
     throw new NotFoundException(`User #${userId} not found`);
   }
   return deletedUser;
}
}
