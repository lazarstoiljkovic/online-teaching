import { IsNotEmpty, MinLength, IsEmail, IsEnum,MaxLength,IsDate } from 'class-validator';


export class CourseDto{
    @IsNotEmpty()
    courseName:string;
    maxNumberOfCustomers:number;
    tutorId:number;

}