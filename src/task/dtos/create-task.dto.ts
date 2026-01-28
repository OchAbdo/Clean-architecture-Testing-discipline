import { IsBoolean, IsString } from "class-validator";

export class CreateTask {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsBoolean()
    isArchived: boolean;
    
}