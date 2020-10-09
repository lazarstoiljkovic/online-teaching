import { IsNotEmpty, MinLength, IsEmail, IsEnum,MaxLength,IsDate } from 'class-validator';


export class TermDto{
    @IsNotEmpty()
    date:Date;
    @IsNotEmpty()
    startTime:Date;
    @IsNotEmpty()
    endTime:Date;
    @IsNotEmpty()
    currentCustomersOnCourse:number;
    
}