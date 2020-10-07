import { Inject, Injectable } from "@nestjs/common";
import { Tutor } from "./tutor.entity";
import {TutorDto} from './dto/tutor.dto'
import { Course } from "src/courses/course.entity";
import { CourseDto } from "src/courses/dto/course.dto";


@Injectable()
export class TutorService{
    constructor(
        @Inject('TUTORS_REPOSITORY') private tutorsRepository: typeof Tutor,
        @Inject('COURSES_REPOSITORY') private courseRepository: typeof Course){

    }

    getAllTutors():Promise<Tutor[]>{
        return this.tutorsRepository.findAll();
    }

    create(tutorDto:TutorDto):Promise<Tutor>{
        return this.tutorsRepository.create(tutorDto);
    }

    getTutorByEmail(email:string):Promise<Tutor>{
        return this.tutorsRepository.findOne({where:{
            email: email
        }});
    }

    getTutorByUsername(username:string):Promise<Tutor>{
        return this.tutorsRepository.findOne({where:{
            username:username
        }});
    }

    createCourse(courseDto:CourseDto):Promise<Course>{
        return this.courseRepository.create(courseDto);
    }

    getAllCourses():Promise<Course[]>{
        return this.courseRepository.findAll();
    }

    findOneById(id: number): Promise<Tutor> {
        return this.tutorsRepository.findOne<Tutor>({ where: { id } });
    }


}