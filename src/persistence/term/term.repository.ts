import { Inject } from "@nestjs/common";
import { Op } from "sequelize";
import { ITermRepository } from "src/domain/term/ITermRepository";
import { TermDto } from "src/domain/term/term.dto";
import { ModelRepository } from "../model/model.repository";
import { Term } from "./term.entity";

export class TermRepository implements ITermRepository{
    termRepo=new ModelRepository(Term);

    constructor(@Inject('TERMS_REPOSITORY') private readonly term:typeof Term){

    }

    getTermForTutor(tutorId: number,termDto:TermDto) {
        const newStartTime=new Date(termDto.startTime);
        const newEndTime=new Date(termDto.endTime);
        const filterOptions={
            tutorId,
            [Op.or]:[
                {
                    startTime: {
                        [Op.lt]:newStartTime
                    },
                    endTime:{
                        [Op.gt]:newStartTime
                    }
                },
                {
                    startTime:{
                        [Op.gt]:newStartTime,
                        [Op.lt]:newEndTime 
                    }
                    
                },
                {
                    startTime:{
                        [Op.eq]:newStartTime
                    }
                }
            ]
        }

        return this.termRepo.getOne(filterOptions);
    }

    updateTerm(termId: number, termDto: TermDto) {
        const model={...termDto};
        const filterOptions={id:termId};
        return this.termRepo.update(model,filterOptions);
    }

    deleteTerm(termId: number) {
        const filterOptions={id:termId};
        return this.termRepo.delete(filterOptions);
    }

    getTermById(termId: number) {
        const filterOptins={id:termId};
        return this.termRepo.getOne(filterOptins);
    }

    createTerm(termDto:TermDto,courseId:number,tutorId:number){
        const model={...termDto,courseId,tutorId}
        return this.termRepo.create(model);
    }

    

}