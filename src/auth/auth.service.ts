import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signUp() {
        return 'I am signup';
    }

    signIn() {
        return 'I am signIn';
    }
}
