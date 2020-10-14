import { Injectable, NestMiddleware } from "@nestjs/common";
import {Request,Response} from 'express';
import { User } from "src/users/user.entity";
import { AuthService } from "../auth.service";

@Injectable()
export class VerifyEmailMiddleware implements NestMiddleware{
    constructor(private readonly authService:AuthService){

    }
    use(req:Request,res:Response,next:Function){
        console.log(req.body);
        console.log('blablablabla');
        next();
    }
}