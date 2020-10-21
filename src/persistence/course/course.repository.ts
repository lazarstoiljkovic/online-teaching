import { Inject, Injectable } from "@nestjs/common";
import { CourseDto } from "src/domain/course/course.dto";
import { ICourseRepository } from "src/domain/course/ICourseRepository";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { ModelRepository } from "../model/model.repository";
import { Course } from "./course.entity";

@Injectable()
export class CourseRepository implements ICourseRepository{
    courseRepo=new ModelRepository(Course);

    constructor(@Inject('COURSES_REPOSITORY') private readonly course:typeof Course){

    }

    getCoursesPaginated(paginationDto: PaginationDto) {
        return this.courseRepo.get(paginationDto);
    }
    getCoursesForUsersPaginated(tutorId: number, paginationDto: PaginationDto) {
        const filterOptions={tutorId:tutorId};
        return this.courseRepo.get(paginationDto,filterOptions);
    }
    getOneCourse(id: number) {
        const filterOptions={id:id};
        return this.courseRepo.get(filterOptions);
    }
    createCourse(courseDto: CourseDto) {
        return this.courseRepo.create(courseDto);
    }
    updateCourse(id: number, courseDto: CourseDto) {
        throw new Error("Method not implemented.");
    }
    deleteCourse(id: number) {
        throw new Error("Method not implemented.");
    }
    
}