import { ApiProperty } from "@nestjs/swagger";
import {  IsString } from "class-validator";


export class UpdatePasswordDto{

    
    @ApiProperty()
    @IsString()
    pw_old: string

    
    @ApiProperty()
    @IsString()
    pw_new1: string

    @ApiProperty()
    @IsString()
    pw_new2: string

    
    
}