import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards,Query } from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { PaginationDto } from "src/auth/dto/pagination.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ModelInstnaceAccessGurad } from "src/auth/guards/modelInstanceAccess.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { tutorProvider } from "src/tutors/tutor.provider";
import { courseProvider } from "./course.provider";
import { CourseService } from "./course.service";
import { CourseDto } from "./dto/course.dto";

@Controller('courses')
export class CourseController{
    constructor(private readonly courseService:CourseService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Query() paginationDto: PaginationDto){
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);

        return this.courseService.findAllCourses(paginationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/tutor/:id')
    getAllCoursesForUsers(
        @Param('id') tutorId:number){
            return this.courseService.findAllCoursesForTutor(tutorId);
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

    @Roles('tutor')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body()course:CourseDto,
        @Request() req){
            
            return await this.courseService.createCourse(course,req.user.id);
    }

    //middleware(guard) for model instance access authorization
    @Roles('tutor')
    @UseGuards(RolesGuard)
    @UseGuards(ModelInstnaceAccessGurad)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() course: CourseDto){
        const updatedCourse = await this.courseService.updateCourse(id, course);

        if (updatedCourse[0]===0) {
            throw new NotFoundException('This course doesnt exist');
        }


        return updatedCourse;
    }

    @Roles('tutor')
    @UseGuards(RolesGuard)
    @UseGuards(ModelInstnaceAccessGurad)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number, @Request() req) {
        const deleted = await this.courseService.deleteCourse(id, req.user.id);

        if (deleted === 0) {
            throw new NotFoundException('This course doesnt exist');
        }

        return 'Successfully deleted';
    }
}