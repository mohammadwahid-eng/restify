import { Controller, Get, UseGuards } from '@nestjs/common';
import { getUser } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guards';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@getUser() user: User) {
    return user;
  }
}
