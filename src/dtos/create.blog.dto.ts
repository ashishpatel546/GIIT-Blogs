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
    @IsString()
    @IsOptional()
    keys: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    urls: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category: string
}