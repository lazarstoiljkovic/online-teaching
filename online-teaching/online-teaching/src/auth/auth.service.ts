import { Injectable } from "@nestjs/common";
import { from } from "rxjs";
import { TutorService } from "src/tutors/tutor.service";
import * as bcrypt from 'bcrypt';
import { Tutor } from "src/tutors/tutor.entity";
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from "src/tokens/dto/token.dto";
@Injectable()
export class AuthService{
    constructor(private readonly tutorService:TutorService,
        private readonly jwtService: JwtService){

    }

    async validateTutor(username:string,pass:string): Promise<any>{
        const tutor=await this.tutorService.getTutorByUsername(username);
        //console.log(tutor);
        if(!tutor){
            return null;
        }

        const com=await this.comparePassword(pass,tutor.password);


        if(!com){
            return null;
        }

        const {password,...result}=tutor;

        return result;


    }

    private async comparePassword(enteredPassword,databasePassword){
        const com=await bcrypt.compare(enteredPassword,databasePassword);
        return com;
    }

    public async login(tutor){
        console.log('blablabla');
        //console.log(tutor);
        const newTutor=tutor.dataValues;
        console.log(newTutor);
        const token=await this.generateToken(newTutor);
        const tokenDto=new TokenDto(token,newTutor.id);
        this.tutorService.addTokenForTutor(tokenDto);
        return {token};
    }

    private async generateToken(tutor) {
        //console.log(tutor);
        const token = await this.jwtService.signAsync(tutor);
        console.log(token);
        return token;
    }

    public async signup(tutor){
/*         const hashedPassword=await this.hashPassword(tutor.password);
        const newTutor={...tutor,password:hashedPassword};
        console.log(newTutor);
        await this.tutorService.create(newTutor);
        const {password,...result}=newTutor;
        const token = await this.generateToken(result); */

        this.hashPassword(tutor.password).then(async (res)=>{
            //console.log(res);
            const newTutor={...tutor, password:res};
            console.log(newTutor);
            await this.tutorService.create(newTutor);
            const tutor1=await this.tutorService.getTutorByUsername(newTutor.username);
            const {password,...result}=newTutor;
            const token=await this.generateToken(result);
            const tokenDto=new TokenDto(token,tutor1.id);
            await this.tutorService.addTokenForTutor(tokenDto);

            return {tutor:result,token};
            
        }).catch((error)=>{
            return 'error';
        });
        

        
        



        
    }

    private async hashPassword(password){
        console.log(password);
        const hash = await bcrypt.hash(password,10);
        console.log(hash);
        return hash;
    }
}