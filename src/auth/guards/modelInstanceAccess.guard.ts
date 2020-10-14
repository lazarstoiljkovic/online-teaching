import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { request } from "express";
import { CourseService } from "src/courses/course.service";

@Injectable()
export class ModelInstnaceAccessGurad implements CanActivate{
    constructor(private reflector:Reflector,private readonly courseService:CourseService){

    }

    canActivate(context:ExecutionContext):boolean|Promise<boolean>|Observable<boolean>{


        const request:any=context.switchToHttp().getRequest<Request>();
        const result=request.user;
        const param=request.params.id;
        //console.log(result);
        //console.log(param);

        const res=this.courseService.findOne(param).then((course)=>{
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





        return res;
    }
}