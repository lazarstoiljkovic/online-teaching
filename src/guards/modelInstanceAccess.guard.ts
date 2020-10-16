import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { request } from "express";
import { CourseService } from '../modules/services/course.service';

@Injectable()
export class ModelInstnaceAccessGurad implements CanActivate{
    constructor(private reflector:Reflector,private readonly courseService:CourseService){

    }

    async canActivate(context:ExecutionContext):Promise<boolean>{


        const request:any=context.switchToHttp().getRequest<Request>();
        const result=request.user;
        const param=request.params.id;
        console.log(result);
        console.log(param);

        const res=await this.courseService.findOne(param);
        console.log(res);
        if(res.tutorId===result.id){
            return true;
        }
        else{
            return false;
        }


        //ne moze ovo ovako za terms
/*         const res=this.courseService.findOne(param).then((course)=>{
            console.log(course.tutorId);
            console.log(result.id);        
            if(course.tutorId===result.id){
                return true;
            }else{
                return false;
            }

        }).catch((err)=>{
            return false;
        })


        console.log(res);

        return res; */
    }
}