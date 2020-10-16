import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../../modules/services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local'){
    constructor(private readonly authService:AuthService){
        super({
            //usernameField:'email'
        });
    }

    async validate(username:string,password:string):Promise<any>{
        const tutor= await this.authService.validateUser(username,password);
        //console.log(tutor);
        if(!tutor){
            throw new UnauthorizedException();
        }

        return tutor;
    }
}