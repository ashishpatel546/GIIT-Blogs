import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './gaurds/AuthGaurd';

@ApiTags('Application Hello World')
@Controller('/app-check')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService:AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/validate-jwt')
  @ApiBearerAuth('access-token')
  validateJwt(@Req() request: Request){
    const token = request.headers['authorization'];    
    if(!token)
    throw new UnauthorizedException('token not found with request')
    const tokenToDecode = token.split(' ')[1]
    
    const decode = this.authService.verifyToken(tokenToDecode)
    return decode?{isTokenVerified: true}:{isTokenVerified: false}
  }
}
