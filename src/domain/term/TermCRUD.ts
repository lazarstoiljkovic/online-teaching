import { Inject } from "@nestjs/common";
import { ITermRepository } from "./ITermRepository";
import { TermDto } from "./term.dto";

export class TermCRUD{
    constructor(@Inject('TermRepo') private readonly termRepository:ITermRepository){

    }

    public async createTerm(termDto:TermDto,courseId:number,tutorId:number){
        return this.termRepository.createTerm(termDto,courseId,tutorId);
    }

    public async getTermById(termId:number){
        return this.termRepository.getTermById(termId);
    }

    public async getTermForTutor(tutorId:number,termDto:TermDto){
        return this.termRepository.getTermForTutor(tutorId,termDto);
    }

    public async updateTerm(termId:number,termDto:TermDto){
        return this.termRepository.updateTerm(termId,termDto);
    }

    public async deleteTerm(termId:number){
        return this.termRepository.deleteTerm(termId);
    }
}