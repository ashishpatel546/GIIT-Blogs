import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
    login(@Body() body:LoginDto){
        return this.authService.signin(body)
    }

    @Post('/validate-token')
    validateJwt(@Body() body:any)
    {
        const {token} = body
        const decode = this.authService.verifyToken(token)
        if(decode) return {tokenStatus: 'Valid'}
        return {tokenStatus: 'In-Valid'}
    }

}
