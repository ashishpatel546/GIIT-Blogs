import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';


interface ClassConstructor{
    new (...args: any[]):{}
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor{
    constructor (private dto: any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run something before the serving request by request handler
        // console.log('I am running befor the handler', context);
        return next.handle().pipe(
            map((data: any) =>{
                // console.log('It will run after the request handler i.e. before the response sent', data);
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
                
            })
        )
    }
}
