import { Inject, Injectable } from "@nestjs/common";
import { PaginationDto } from "src/models/dtos/pagination.dto";
import { User } from "src/models/user.entity";
import { Course } from "../../models/course.entity";
import { CourseDto } from "../../models/dtos/course.dto";


@Injectable()
export class CourseService{
    constructor(
        @Inject('COURSES_REPOSITORY') private readonly courseRepository: typeof Course){

    }

    async createCourse(courseDto:CourseDto, tutorId:number): Promise<Course>{
        console.log(tutorId);
        return await this.courseRepository.create({...courseDto,tutorId});
    }

    async findAllCoursesForTutor(tutorId:number):Promise<Course[]>{
        return await this.courseRepository.findAll({
            where:{tutorId},
            include:[{
                model:User,
                attributes:{
                    exclude:['password']
                }
            }]
        })
    }

    async findAllCourses(paginationDto:PaginationDto):Promise<Course[]>{

        const skippedItems=(paginationDto.page-1)*paginationDto.limit;
        return this.courseRepository.findAll({
            limit:paginationDto.limit,
            offset:skippedItems,
            include:[{
                model:User,
                attributes:{
                    exclude:['password']
                }
            }]
        });
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