import { Inject, Injectable } from "@nestjs/common";
import { PaginationDto } from "../user/pagination.dto";
import { CourseDto } from "./course.dto";
import { ICourseRepository } from "./ICourseRepository";

@Injectable()
export class CourseCRUD{
    constructor(@Inject('CourseRepo') private readonly courseRepository:ICourseRepository){

    }

    public async getCoursesPaginated(paginationDto:PaginationDto){
        return this.courseRepository.getCoursesPaginated(paginationDto);
    }

    public async getCoursesForUsersPaginated(tutorId:number,paginationDto:PaginationDto){
        return this.courseRepository.getCoursesForUsersPaginated(tutorId,paginationDto);
    }

    public async getOneCourse(id:number){
        return this.courseRepository.getOneCourse(id);
    }

    public async createCourse(courseDto:CourseDto){
        return this.courseRepository.createCourse(courseDto);
    }
}