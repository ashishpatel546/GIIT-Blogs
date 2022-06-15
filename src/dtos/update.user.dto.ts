import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsMobilePhone, IsOptional, IsString } from "class-validator";


export class UpdateUserDto{

    
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string

    
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string

    
    @ApiProperty()
    @IsOptional()
    @IsMobilePhone()
    mobile:string

    
    @ApiProperty()
    @IsOptional()
    @IsString()
    country: string
}