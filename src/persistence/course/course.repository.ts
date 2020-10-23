import { Inject, Injectable } from "@nestjs/common";
import { CourseDto } from "src/domain/course/course.dto";
import { ICourseRepository } from "src/domain/course/ICourseRepository";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { ModelRepository } from "../model/model.repository";
import { User } from "../user/user.entity";
import { Course } from "./course.entity";

@Injectable()
export class CourseRepository implements ICourseRepository{
    courseRepo=new ModelRepository(Course);

    constructor(@Inject('COURSES_REPOSITORY') private readonly course:typeof Course){

    }

    getCoursesPaginated(paginationDto: PaginationDto) {
        const relationOptions=[User];
        return this.courseRepo.get(paginationDto,undefined,undefined,relationOptions);
    }
    getCoursesForUsersPaginated(tutorId: number, paginationDto: PaginationDto) {
        const filterOptions={tutorId:tutorId};
        return this.courseRepo.get(paginationDto,filterOptions);
    }
    getOneCourse(id: number) {
        const filterOptions={id:id};
        return this.courseRepo.get(undefined,filterOptions,undefined,undefined);
    }
    createCourse(courseDto: CourseDto) {
        return this.courseRepo.create(courseDto);
    }
    updateCourse(id: number, courseDto: CourseDto) {
        const model={...courseDto};
        const filterOptions={id:id};
        return this.courseRepo.update(model,filterOptions);
    }

    deleteCourse(id: number,tutorId:number) {
        const filterOptions={id:id,tutprId:tutorId};
        return this.courseRepo.delete(filterOptions);
    }
    
}