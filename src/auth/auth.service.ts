import { ForbiddenException, Injectable } from "@nestjs/common";
import { from } from "rxjs";
import { TutorService } from "src/tutors/tutor.service";
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Tutor } from "src/tutors/tutor.entity";
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from "src/tokens/dto/token.dto";
import { CustomerService } from "src/customers/customer.service";
import { CustomerDto } from "src/customers/dto/customer.dto";
import { UserService } from "src/users/user.service";
@Injectable()
export class AuthService{
    constructor(private readonly tutorService:TutorService,
        private readonly customerService:CustomerService,
        private readonly jwtService: JwtService,
        private readonly userService:UserService){

    }

    async validateUser(username:string,pass:string): Promise<any>{
        const user=await this.userService.getUserByUsername(username);
        if(!user){
            return null;
        }

        const com=await this.comparePassword(pass,user.password);


        if(!com){
            return null;
        }

        const {password,...result}=user;

        return result;


    }

    private async comparePassword(enteredPassword,databasePassword){
        const com=await bcrypt.compare(enteredPassword,databasePassword);
        return com;
    }

    public async login(tutor){

        const newTutor=tutor.dataValues;
        const token=await this.generateToken(newTutor);

        return {token};
    }


    private async generateToken(tutor) {
        const token = await this.jwtService.signAsync(tutor);
        console.log(token);
        return token;
    }

    public async signup(tutor){

        const user=this.hashPassword(tutor.password).then(async (res)=>{
            const newTutor={...tutor, password:res};
            await this.userService.createUser(newTutor);
            const {password,...result}=newTutor;
            const token=await this.generateToken(result);

            return {...newTutor,token};
            
        }).catch((error)=>{
            return 'error';
        });

        return user;
        
    }

    private async hashPassword(password){
        const hash = await bcrypt.hash(password,10);
        return hash;
    }

    async sendEmailVerification(email: string): Promise<boolean> {
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: 'jalyn95@ethereal.email',
                pass: '6Jkc8qj9Y3rXVErjrn'
            }
        });
    
        let mailOptions = {
          from: '"Company" <' + 'djlaza007@gmail.com' + '>', 
          to: email,
          subject: 'Verify Email', 
          text: 'Verify Email', 
          html: 'Hi! <br><br> Thanks for your registration<br><br>'+
          '<a href='+ 'localhost' + ':' + '3000' +'/auth/email/verify/'+ email + '>Click here to activate your account</a>'
        };
    
        var sent = await new Promise<boolean>(async function(resolve, reject) {
          return await transporter.sendMail(mailOptions, async (error, info) => {
              if (error) {      
                console.log('Message sent: %s', error);
                return reject(false);
              }
              console.log('Message sent: %s', info.messageId);
              resolve(true);
          });      
        })

        return sent;  
    }

    async verifyEmail(email:string){
        const customer=await this.userService.getUserByEmail(email);
        customer.validEmail=true;
        const savedCustomer=await customer.save();

        return savedCustomer;
    }
}