import { Inject, Injectable } from "@nestjs/common";
import { createWriteStream } from "fs";
import { Course } from "src/courses/course.entity";
import { CourseService } from "src/courses/course.service";
import { TermDto } from "./dto/term.dto";
import { Term } from "./term.entity";

@Injectable()
export class TermService{
    constructor(
        @Inject('TERMS_REPOSITORY') private readonly termRepository : typeof Term,
        private readonly courseService:CourseService
    ){

    }

    async createTerm(term:TermDto,courseId:number,tutorId:number):Promise<Term>{
        console.log('asdasdsad');
        const result=await this.courseService.findOne(courseId);
        console.log(result);
        if(result.tutorId===tutorId){
            return this.termRepository.create({...term,courseId});
        }
        return null;

    }

    async findOne(id:number){
        return await this.termRepository.findOne({
            where:{id},
            include:[{
                model:Course
            }]
        })
    }

    
}