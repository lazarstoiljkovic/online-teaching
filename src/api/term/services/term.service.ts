import { Inject, Injectable } from "@nestjs/common";
import { Course } from "src/persistence/course/course.entity";
import { CourseService } from "../../course/services/course.service";
import { TermDto } from "../../../domain/term/term.dto";
import { Term } from "../../../persistence/term/term.entity";
import * as dayjs from 'dayjs'
import { Op } from "sequelize";
import { TermCRUD } from "src/domain/term/TermCRUD";

@Injectable()
export class TermService{
    constructor(
        @Inject('TERMS_REPOSITORY') private readonly termRepository : typeof Term,
        private readonly termCRUD:TermCRUD
    ){

    }

    async createTerm(term:TermDto,courseId:number,tutorId:number):Promise<Term>{
        const pom=await this.checkIfFreeTerm(tutorId,term);

        if(!pom){
            return null;
        }

        return this.termCRUD.createTerm(term,courseId,tutorId);
        
    }

    private async checkIfFreeTerm(tutorId:number,termDto:TermDto):Promise<boolean>{

        const term=await this.termCRUD.getTermForTutor(tutorId,termDto);

        console.log(term);

        if(term===null){
            return true;
        }

        return false;
    }

    async findOne(id:number){
        return this.termCRUD.getTermById(id);
    }

    async updateTerm(id:number,termDto:TermDto){
        return this.termCRUD.updateTerm(id,termDto);
    }

    async deleteTerm(id:number){
        return this.termCRUD.deleteTerm(id);
    }

    
}