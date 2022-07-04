import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/dtos/create.user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { UserDto } from 'src/dtos/showUser.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Serialize(UserDto)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    signUp(@Body() body:CreateUserDto){
        return this.authService.signup(body)
    }

    @Post('/login')
    async login(@Body() body:LoginDto, @Res({passthrough: true}) res: Response){
        const resp = await this.authService.signin(body)
        res.status(200).json(resp)
    }

}
