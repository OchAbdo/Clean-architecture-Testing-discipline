import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateTask{
    
    @IsString()
    @IsOptional()
    title: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsBoolean()
    @IsOptional()
    isArchived: boolean;
}