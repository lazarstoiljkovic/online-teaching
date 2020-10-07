import { Body, Controller, Get, Post } from "@nestjs/common";
import { IsEmail } from "sequelize-typescript";
import { courseProvider } from "src/courses/course.provider";
import { TutorDto } from "./dto/tutor.dto";
import { TutorService } from "./tutor.service";
import {CourseDto} from '../courses/dto/course.dto'

@Controller('tutors')
export class TutorController{
    constructor(private readonly tutorService:TutorService){

    }

    //rest api methods
    @Get()
    getTutors(){
        return this.tutorService.getAllTutors();
    }

    @Post()
    createTutor(
        @Body('firstName') firstName:string,
        @Body('lastName') lastName:string,
        @Body('email') email:string,
        @Body('username') username:string,
        @Body('password') password:string){
            return this.tutorService.create(new TutorDto(firstName,lastName,email,username,password));
    }

    @Post('courses')
    createCourse(
        //@Body('courseId') courseId:string,
        @Body('courseName') courseName:string,
        @Body('maxNumberOfCustomers') maxNumberOfCustomers:number
    ){
        //user who create course pass their id
        const id=Math.random().toString();
        this.tutorService.createCourse(new CourseDto(id,courseName,maxNumberOfCustomers,1));
    }

    @Get('courses')
    getCourses(){
        return this.tutorService.getAllCourses();
    }
}