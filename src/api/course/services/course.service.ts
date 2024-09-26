import { HttpService, Inject, Injectable } from "@nestjs/common";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { Course } from "../../../persistence/course/course.entity";
import { CourseDto } from "../../../domain/course/course.dto";
import { CourseCRUD } from "src/domain/course/CourseCRUD";
import { WebhookCRUD } from "src/domain/webhook/WebhookCRUD";
import { WebhookService } from "src/domain/services/webhook.service";
import { WebhookDto } from "src/domain/webhook/webhook.dto";
import { MathService } from "src/domain/services/math.service";


@Injectable()
export class CourseService{
    constructor(
        @Inject('COURSES_REPOSITORY') private readonly courseRepository: typeof Course,
        private readonly httpService:HttpService,
        private readonly courseCRUD:CourseCRUD,
        private readonly webhookCRUD:WebhookCRUD,
        private readonly webhookService:WebhookService,
        private readonly mathService:MathService){

    }

    async createCourse(courseDto:CourseDto, tutorId:number): Promise<Course>{
        console.log(tutorId);
        const webhooks=await this.webhookCRUD.findWebhooksForEvent('course','create');

        const array:any[]=webhooks.rows;
        const course=await this.courseCRUD.createCourse(courseDto,tutorId);

        console.log(array,course)

        this.webhookService.sendToAllRegisteredClient(array,course);

        return course;
    }

    async findAllCoursesForTutor(tutorId:number,paginationDto:PaginationDto):Promise<Course[]>{
        return this.courseCRUD.getCoursesForUsersPaginated(tutorId,paginationDto);
    }

    async findAllCourses(paginationDto:PaginationDto):Promise<Course[]>{
        return this.courseCRUD.getCoursesPaginated(paginationDto);
    }

    async findOne(id):Promise<Course>{
        return this.courseCRUD.getOneCourse(id);
    }

    async deleteCourse(id:number,tutorId:number){
        return this.courseCRUD.deleteCourse(id,tutorId);
    }

    async updateCourse(id:number,course:CourseDto){
        const webhooks=await this.webhookCRUD.findWebhooksForEvent('course','update');
        const array:any[]=webhooks.rows;
        const newCourse=this.courseCRUD.updateCourse(id,course);

        await this.webhookService.sendToAllRegisteredClient(array,newCourse);


        return newCourse;
    }

}