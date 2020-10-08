import { Inject, Injectable } from "@nestjs/common";
import { Tutor } from "./tutor.entity";
import {TutorDto} from './dto/tutor.dto'
import { Course } from "src/courses/course.entity";
import { CourseDto } from "src/courses/dto/course.dto";
import { Token } from "src/tokens/token.entity";
import { TokenDto } from "src/tokens/dto/token.dto";


@Injectable()
export class TutorService{
    constructor(
        @Inject('TUTORS_REPOSITORY') private tutorsRepository: typeof Tutor,
        @Inject('COURSES_REPOSITORY') private courseRepository: typeof Course,
        @Inject('TOKENS_REPOSITORY') private readonly tokenRepository: typeof Token){

    }

    getAllTutors():Promise<Tutor[]>{
        return this.tutorsRepository.findAll();
    }

    async create(tutorDto:TutorDto):Promise<Tutor>{
        const tutor=await this.tutorsRepository.create(tutorDto);
        //await this.addTokenForTutor(new TokenDto(token,tutor.id));

        return tutor;
    }

    async addTokenForTutor(token:TokenDto){
        return await this.tokenRepository.create(token);
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