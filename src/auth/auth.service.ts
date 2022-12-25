import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { encodePassword, verifyPassword } from './utils';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService) {}

    async signUp(dto: SignUpDto) {
        const password = await encodePassword(dto.password);
        const user = this.userService.create({ ...dto, password });
        delete (await user).password;
        return user;
    }

    async signIn(dto: SignInDto) {
        const user = await this.userService.findOneBy({ email: dto.email });
        if(user) {
            const matched = await verifyPassword(user.password, dto.password);
            if(matched) {
                delete user.password;
                return user;
            };
        }
        
        throw new BadRequestException();
    }
}
