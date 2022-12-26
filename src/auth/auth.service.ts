import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationDto, LoginDto } from './dto';
import { UsersService } from '../users/users.service';
import { encodePassword, verifyPassword } from './utils';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

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
    const accessToken = await this.signToken(user.id, user.email);
    return { accessToken };
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    return this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }
}
