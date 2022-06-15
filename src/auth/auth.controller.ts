import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/create.user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    signUp(@Body() body:CreateUserDto){
        return this.authService.signup(body)
    }

    @Post('/login')
    login(@Body() body:LoginDto){
        return this.authService.signin(body)
    }
}
