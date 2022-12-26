import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationDto, LoginDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { encodePassword, verifyPassword } from './utils';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async registration(dto: RegistrationDto) {
    const password = await encodePassword(dto.password);
    const user = this.userService.create({ ...dto, password });
    delete (await user).password;
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findOneBy({ email: dto.email });
    if (!user) throw new BadRequestException();

    const matched = await verifyPassword(user.password, dto.password);
    if (!matched) throw new BadRequestException();

    delete user.password;
    return user;
  }
}
