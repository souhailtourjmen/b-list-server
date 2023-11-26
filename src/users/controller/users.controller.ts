import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { UsersService } from "../service/users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
   async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
  try {
    const newUser = await this.usersService.createUser(createUserDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'User has been created successfully',
    newUser,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: User not created!',
    error: 'Bad Request'
 });
 }
}


@Get()
async findAllUsers(@Res() response) {
try {
  const UserData = await this.usersService.findAllUsers();
  return response.status(HttpStatus.OK).json({
  message: 'All Users data found successfully',UserData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
  @Get(":id")
  async findUser(@Res() response, @Param('id') userId: number) {
    try {
       const existingUser = await
   this.usersService.findUser(userId);
       return response.status(HttpStatus.OK).json({
       message: 'User found successfully',existingUser,});
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
   }

  @Patch(":id")
  async updateUser(@Res() response,@Param('id') userId: string,
  @Body() updateUserDto: UpdateUserDto) {
    try {
     const existingUser = await this.usersService.updateUser(userId, updateUserDto);
    return response.status(HttpStatus.OK).json({
    message: 'User has been successfully updated',
    existingUser,});
   } catch (err) {
     return response.status(err.status).json(err.response);
   }
  }

  @Delete(":id")
  async remove(@Res() response, @Param('id') userId: number)
  {
    try {
      const deletedUser = await this.usersService.removeUser(userId);
      return response.status(HttpStatus.OK).json({
      message: 'deletedUser deleted successfully',
      deletedUser,});
    }catch (err) {
      return response.status(err.status).json(err.response);
    }
   }
  
}
