import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { courseProvider } from "./course.provider";
import { CourseService } from "./course.service";
import { CourseDto } from "./dto/course.dto";

@Controller('courses')
export class CourseController{
    constructor(private readonly courseService:CourseService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(){
        return this.courseService.findAllCourses();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(
        @Param('id')courseId:number){

            const course=await this.courseService.findOne(courseId);

            if(!course){
                throw new NotFoundException('This course doesnt exist');
            }

            return course;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body()course:CourseDto,
        @Request() req){
            
            return await this.courseService.createCourse(course,req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() course: CourseDto, @Request() req){
        const updatedCourse = await this.courseService.updateCourse(id, course, req.user.id);

        if (updatedCourse[0]===0) {
            throw new NotFoundException('This course doesnt exist');
        }


        return updatedCourse;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number, @Request() req) {
        //console.log(req.user.id);
        const deleted = await this.courseService.deleteCourse(id, req.user.id);

        if (deleted === 0) {
            throw new NotFoundException('This course doesnt exist');
        }

        return 'Successfully deleted';
    }
}