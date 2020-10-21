import { Inject, Injectable } from "@nestjs/common";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { User } from "src/persistence/user/user.entity";
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
        return await this.courseRepository.create({...courseDto,tutorId});
    }

    async findAllCoursesForTutor(tutorId:number,paginationDto:PaginationDto):Promise<Course[]>{
        return this.courseCRUD.getCoursesForUsersPaginated(tutorId,paginationDto);
/*         return await this.courseRepository.findAll({
            where:{tutorId},
            include:[{
                model:User,
                attributes:{
                    exclude:['password'],
                }
            }]
        }) */
    }

    async findAllCourses(paginationDto:PaginationDto):Promise<Course[]>{
        return this.courseCRUD.getCoursesPaginated(paginationDto);

/*         const skippedItems=(paginationDto.page-1)*paginationDto.limit;
        return this.courseRepository.findAll({
            limit:paginationDto.limit,
            offset:skippedItems,
            include:[{
                model:User,
                attributes:{
                    exclude:['password']
                }
            }]
        }); */
    }

    async findOne(id):Promise<Course>{
        return await this.courseRepository.findOne({
            where: {id},
            include:[{
                model:User,
                attributes:{
                    exclude:['password']
                }
            }]
        });
    }

    async deleteCourse(id:number,tutorId:number){
        return await this.courseRepository.destroy({
            where:{id,tutorId}
        });
    }

    async updateCourse(id:number,course:CourseDto){
        return await this.courseRepository.update({...course},{
            where:{
                id
            }
        });
    }

}