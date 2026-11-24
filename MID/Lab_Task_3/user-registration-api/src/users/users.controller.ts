import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return {
      message: 'User registered successfully',
      user: {
        fullName: dto.fullName,
        email: dto.email,
        age: dto.age,
        accountType: dto.accountType,
      },
    };
  }
}