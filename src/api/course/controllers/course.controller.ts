import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards,Query } from "@nestjs/common";
import { Roles } from "src/auth/guards/decorators/roles.decorator";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ModelInstnaceAccessGurad } from "src/auth/guards/modelInstanceAccess.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { CourseService } from "../services/course.service";
import { CourseDto } from '../../../domain/course/course.dto';
import { PaginationResponseDto } from "src/domain/user/paginatio-response.dto";
import { MathService } from "src/domain/services/math.service";
import { WebhookService } from "src/domain/services/webhook.service";

@Controller('courses')
export class CourseController{
    constructor(private readonly courseService:CourseService,private readonly mathService:MathService,private readonly webhookService:WebhookService){}

    @Post('/accumulate')
    async accumulate(@Body()data:any
    ){
        const result=await this.webhookService.sendCourseEventToClient(data,'create-course',{});
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Query() paginationDto: PaginationDto){
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);

        return this.courseService.findAllCourses(paginationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/tutor/:id')
    getAllCoursesForUsers(
        @Param('id') tutorId:number,
        @Query() paginationDto: PaginationDto){
            paginationDto.page = Number(paginationDto.page);
            paginationDto.limit = Number(paginationDto.limit);
            return this.courseService.findAllCoursesForTutor(tutorId,paginationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(
        @Param('id') courseId:number){

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