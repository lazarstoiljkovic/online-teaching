import { IsNotEmpty, MinLength, IsEmail, IsEnum,MaxLength } from 'class-validator';

export class CustomerDto{
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    password:string;
    validEmail:boolean;
    //additional properties if necessary
    
}