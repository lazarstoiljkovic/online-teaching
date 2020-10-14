import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { TutorService } from "src/tutors/tutor.service";
import { UserService } from "src/users/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private readonly userService:UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'secret-key'
        });
    }

    async validate(payload:any){
        const user=await this.userService.getUserByUsername(payload.username);
        if(!user){
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }

        return payload;

    }


}