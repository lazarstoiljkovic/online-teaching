import { Inject, Injectable } from "@nestjs/common";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { Course } from "../../../persistence/course/course.entity";
import { CourseDto } from "../../../domain/course/course.dto";
import { CourseCRUD } from "src/domain/course/CourseCRUD";


@Injectable()
export class CourseService{
    constructor(
        @Inject('COURSES_REPOSITORY') private readonly courseRepository: typeof Course,
        private readonly courseCRUD:CourseCRUD){

    }

    async createCourse(courseDto:CourseDto, tutorId:number): Promise<Course>{
        console.log(tutorId);
        return this.courseCRUD.createCourse(courseDto);
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
        return this.courseCRUD.updateCourse(id,course);
    }

}