import { PaginationDto } from "../user/pagination.dto";
import { CourseDto } from "./course.dto";

export interface ICourseRepository{
    getCoursesPaginated(paginationDto:PaginationDto);
    getCoursesForUsersPaginated(tutorId:number,paginationDto:PaginationDto);
    getOneCourse(id:number);
    createCourse(courseDto:CourseDto,tutorId:number);
    updateCourse(id:number,courseDto:CourseDto);
    deleteCourse(id:number,tutorId:number);
}