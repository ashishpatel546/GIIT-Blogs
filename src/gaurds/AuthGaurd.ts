import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService : AuthService,
        // private readonly userService: UserService
        ){}
  async canActivate(context: ExecutionContext){
    //   const [request, response, next] = context.getArgs()
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization;
    if(!token)
    throw new UnauthorizedException('token not found with request')
    
    try{
    const tokenToDecode = token.split(' ')[1]
    
    const decode = this.authService.verifyToken(tokenToDecode)
    const user = await this.authService.findUserByEmail(decode['email'])
    request.user = user;
    // request.userEmail = decode['email']
    return true
    }
    catch(error){
        throw new UnauthorizedException("Unauthorized Token")
    }
    
  }
    
}
