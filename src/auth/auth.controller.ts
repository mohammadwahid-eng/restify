import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService :AuthService) {}

    @Post('signup')
    signUp(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
    }

    @Post('signin')
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }
}
