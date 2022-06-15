import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator( (data:never, ctx: ExecutionContext)=>{
    const user= ctx.switchToHttp().getRequest().user;
    if(!user)
    return null;
    return user;
})