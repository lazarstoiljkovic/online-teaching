import { Inject, Injectable } from "@nestjs/common";
import { createWriteStream } from "fs";
import { Course } from "src/models/course.entity";
import { CourseService } from "../services/course.service";
import { User } from "src/models/user.entity";
import { TermDto } from "../../models/dtos/term.dto";
import { Term } from "../../models/term.entity";

@Injectable()
export class TermService{
    constructor(
        @Inject('TERMS_REPOSITORY') private readonly termRepository : typeof Term,
        private readonly courseService:CourseService
    ){

    }

    async createTerm(term:TermDto,courseId:number,tutorId:number):Promise<Term>{

        const pom=await this.checkIfFreeTerm(tutorId,term);
        //console.log('sdsdfdsf');
        //console.log(pom);
        if(pom===false){
            return null;
        }

        return this.termRepository.create({...term,courseId,tutorId});
        
    }

    private async checkIfFreeTerm(tutorId:number,termDto:TermDto):Promise<boolean>{
        let newStartTime=new Date(termDto.startTime);
        let newEndTime=new Date(termDto.endTime);
        console.log(newStartTime);
        console.log(newEndTime);

        const terms=await this.termRepository.findAll({
            where:{tutorId:tutorId}
        });

        let pom:boolean=true;

        pom=terms.every((term)=>{
            let startTime=new Date(term.startTime);
            let endTime=new Date(term.endTime);

            if(this.compareDate(newStartTime,startTime)===0)
            {
                console.log('bla');

                return false;
            }
            else if(this.compareDate(newStartTime,startTime)===1 && this.compareDate(newStartTime,endTime)===-1){
                console.log('blabla');

                return false;
            }
            else if(this.compareDate(newStartTime,startTime)===-1 && this.compareDate(newEndTime,startTime)===1){
                console.log('blablabla');

                return false;
            }
            else
            {
                return true;
            }


        });

        console.log(pom);

        return pom;

    }

    private compareDate(date1:Date,date2:Date):number{
        let d1 = new Date(date1); let d2 = new Date(date2);

        let same = d1.getTime() === d2.getTime();
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