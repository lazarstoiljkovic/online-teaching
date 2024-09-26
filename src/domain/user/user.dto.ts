import { IsNotEmpty, MinLength, IsEmail, IsEnum,MaxLength } from 'class-validator';
import {UserRole} from '../../persistence/user/user.entity';



export class UserDto{
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
    role:UserRole;
    validEmail:boolean;
    profileDetails:string;


    
}