import { Inject, Injectable } from "@nestjs/common";
import { Tutor } from "src/tutors/tutor.entity";
import { Course } from "./course.entity";
import { CourseDto } from "./dto/course.dto";

@Injectable()
export class CourseService{
    constructor(@Inject('COURSES_REPOSITORY') private readonly courseRepository: typeof Course){

    }

    async createCourse(courseDto:CourseDto, tutorId:number): Promise<Course>{
        console.log(tutorId);
        return await this.courseRepository.create({...courseDto,tutorId});
    }

    async findAllCourses():Promise<Course[]>{
        return await this.courseRepository.findAll({
            include:[{
                model:Tutor,
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
                model:Tutor,
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

    async updateCourse(id:number,course:CourseDto,tutorId:number){
        return await this.courseRepository.update({...course},{
            where:{
                id,tutorId
            }
        });
    }

}