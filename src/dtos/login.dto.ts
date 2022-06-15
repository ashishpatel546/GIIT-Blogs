import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";


export class LoginDto{

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsAlphanumeric()
    @IsNotEmpty()
    password: string
}