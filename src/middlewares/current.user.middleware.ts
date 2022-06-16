import { Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import {User} from '../entities/user.entity'

declare global{
    namespace Express {
        interface Request{
            user?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(private readonly userService: UserService){}

    async use(req: any, res: any, next: (error?: any) => void) {
        const {email} = req.userEmail || {};
        if(email){
            const user = await this.userService.findByEmail(email)
            req.user= user;
        }
        next()

    }
}