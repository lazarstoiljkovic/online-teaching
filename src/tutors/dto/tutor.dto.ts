import { kMaxLength } from 'buffer';
import { IsNotEmpty, MinLength, IsEmail, IsEnum,MaxLength } from 'class-validator';
import { Length } from 'sequelize-typescript';


export class TutorDto{
    @IsNotEmpty()
    firstName:string;
    @IsNotEmpty()
    lastName:string;
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    username:string;
    @MinLength(6)
    password:string;
    //additional properties if necessary

    constructor(firstName:string,lastName:string,email:string,username:string,password:string){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.username=username;
        this.password=password;
    }
    
}