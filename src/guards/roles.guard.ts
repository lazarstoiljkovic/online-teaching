import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import {Request} from 'express';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){

    }

    canActivate(context:ExecutionContext):boolean|Promise<boolean>|Observable<boolean>{
        const roles=this.reflector.get<string[]>('roles',context.getHandler());

        if(!roles){
            return true;
        }

        const request:any=context.switchToHttp().getRequest<Request>();
        const user=request.user;

        const {role}=user;
        console.log(user.role);

        if(!user){
            return false;
        }

        if(user.role===roles[0]){
            return true;
        }

        return false;
    }
}