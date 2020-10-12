import { Controller, Get, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CourseService } from "src/courses/course.service";

@Controller('customers')
export class CustomerController{

    constructor(private readonly courseService:CourseService){

    }

    @UseGuards(JwtAuthGuard)
    @Get('/courses/:tutorId')
    async getAllCoursesForTutor(@Param('tutorId') tutorId:number){
        const result=await this.courseService.findAllCoursesForTutor(tutorId);
        if(!result){
            throw new NotFoundException('Courses for this tutor doesnt exist');
        }

        return result;
    }

}