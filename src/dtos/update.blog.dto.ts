import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateBlogDto{


    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    keys: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    urls: string

}