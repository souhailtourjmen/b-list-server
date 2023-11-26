import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
    @IsNumber()
    @IsNotEmpty()
    readonly age: number;
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly breed: string;
   
}