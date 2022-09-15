import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/dtos/create.user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { UserDto } from 'src/dtos/showUser.dto';
import { User } from 'src/entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/currentUserDecorator';
import { UpdatePasswordDto } from 'src/dtos/update.password.dto';
import { AuthGuard } from 'src/gaurds/AuthGaurd';

// @Serialize(UserDto)
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

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @Post('/change-password')
    async changePassword(@Body() body:UpdatePasswordDto,@CurrentUser() user:User){
        const {pw_new1,pw_new2, pw_old} = body
           const resp = await this.authService.changePassword(pw_old,pw_new1,pw_new2,user)
           return resp
    }

}
