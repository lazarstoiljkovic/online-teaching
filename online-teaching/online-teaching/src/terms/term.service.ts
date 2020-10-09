import { Inject, Injectable } from "@nestjs/common";
import { createWriteStream } from "fs";
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
        if((await result).tutorId===tutorId){
            return await this.termRepository.create({...term,courseId});
        }
        else{
            return null;
        }

    }

    
}