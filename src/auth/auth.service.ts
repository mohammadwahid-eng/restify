import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    async signUp(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        return dto;
    }

    signIn(dto: AuthDto) {
        return dto;
    }
}
