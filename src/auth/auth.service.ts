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
@Injectable()
export class AuthService{
    constructor(private readonly tutorService:TutorService,
        private readonly customerService:CustomerService,
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

        const newTutor=tutor.dataValues;
        //console.log(newTutor);
        const token=await this.generateToken(newTutor);
        const tokenDto=new TokenDto(token,newTutor.id);
        this.tutorService.addTokenForTutor(tokenDto);
        return {token};
    }

    public async loginCustomer(customer){
        const newCustomer=customer.dataValues;
        const token=await this.generateToken(newCustomer);

        return {token};
    }


    private async generateToken(tutor) {
        //console.log(tutor);
        const token = await this.jwtService.signAsync(tutor);
        console.log(token);
        return token;
    }

    public async registerCustomer(customer:CustomerDto){
        this.hashPassword(customer.password).then(async (res)=>{
            const newCustomer={...customer,password:res};
            await this.customerService.createCustomer(newCustomer);
            //const customer1=await this.customerService.getCustomerByEmail(newCustomer.email);
            const {password,...result}=newCustomer;
            const token=await this.generateToken(result);

            return {customer:result,token};
        }).catch((error)=>{
            return 'error';
        })
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

    async sendEmailVerification(email: string): Promise<boolean> {
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: 'flavie.wolf10@ethereal.email',
                pass: 'nee3j6ugKDvrBnPQhv'
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
        const customer=await this.customerService.getCustomerByEmail(email);
        customer.validEmail=true;
        const savedCustomer=await customer.save();

        return savedCustomer;
    }
}