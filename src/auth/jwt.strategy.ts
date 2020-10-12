import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { TutorService } from "src/tutors/tutor.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private readonly tutorService:TutorService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'secret-key'
        });
    }

    async validate(payload:any){
        const tutor=await this.tutorService.getTutorByUsername(payload.username);
        if(!tutor){
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }

        return payload;

    }


}