import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsMobilePhone, IsString } from "class-validator";


export class CreateUserDto{

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsAlphanumeric()
    password: string

    @ApiProperty()
    @IsMobilePhone()
    mobile:string

    @ApiProperty()
    @IsString()
    country: string
}