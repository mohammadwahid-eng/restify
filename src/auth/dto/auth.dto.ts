import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}