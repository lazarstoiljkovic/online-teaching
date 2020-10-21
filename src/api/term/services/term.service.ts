import { Inject, Injectable } from "@nestjs/common";
import { Course } from "src/persistence/course/course.entity";
import { CourseService } from "../../course/services/course.service";
import { TermDto } from "../../../domain/term/term.dto";
import { Term } from "../../../persistence/term/term.entity";
import * as dayjs from 'dayjs'
import { Op } from "sequelize";

@Injectable()
export class TermService{
    constructor(
        @Inject('TERMS_REPOSITORY') private readonly termRepository : typeof Term,
    ){

    }

    async createTerm(term:TermDto,courseId:number,tutorId:number):Promise<Term>{
        const pom=await this.checkIfFreeTerm(tutorId,term);
        //console.log('sdsdfdsf');
        //console.log(pom);
        if(!pom){
            return null;
        }

        return this.termRepository.create({...term,courseId,tutorId});
        
    }

    private async checkIfFreeTerm(tutorId:number,termDto:TermDto):Promise<boolean>{
        const newStartTime=new Date(termDto.startTime);
        const newEndTime=new Date(termDto.endTime);
        console.log(newStartTime);
        console.log(newEndTime);

        const term=await this.termRepository.findOne({
            where:{
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
                        
                    }
                ]
                
            }
        });

        console.log(term);

        if(term===null){
            return true;
        }

        return false;
    }

    private compareDate(date1:Date,date2:Date):number{
        const d1 = new Date(date1); const d2 = new Date(date2);

        const same = d1.getTime() === d2.getTime();
        if (same) return 0;
      
        if (d1 > d2) return 1;
       
        if (d1 < d2) return -1;
    }

    async findOne(id:number){
        console.log(7889787897);
        return await this.termRepository.findOne({
            where:{id},
            include:[{
                model:Course
            }]
        });
    }

    async updateTerm(id:number,termDto:TermDto){
        return this.termRepository.update({...termDto},{
            where:{
                id:id
            }
        });
    }

    async deleteTerm(id:number){
        return this.termRepository.destroy({
            where:{id}
        });
    }

    
}