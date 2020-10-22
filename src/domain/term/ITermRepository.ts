import { TermDto } from "./term.dto";

export interface ITermRepository{
    createTerm(termDto:TermDto,courseId:number,tutorId:number);
    updateTerm(termId:number,termDto:TermDto);
    deleteTerm(termId:number);
    getTermById(termId:number);
    getTermForTutor(tutorId:number,termDto:TermDto);
}