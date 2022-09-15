import { Expose } from "class-transformer";


export class UserDto {

    @Expose()
    id:string
    
    @Expose()
    name: string

    @Expose()
    email:string

    @Expose()
    mobile:string

    @Expose()
    country:string

    @Expose()
    created_on:string
    


}