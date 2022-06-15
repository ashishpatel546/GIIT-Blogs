import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDto{


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsArray()
    keys: string[]

    @ApiProperty({type: [String]})
    @IsOptional()
    @IsArray()
    urls: string[]
}