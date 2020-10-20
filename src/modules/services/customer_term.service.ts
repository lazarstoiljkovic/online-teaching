import { Inject, Injectable } from "@nestjs/common";
import { CourseService } from "../services/course.service";
import { TermService } from "src/modules/services/term.service";
import { CustomerTerm } from "../../models/customer_term.entity";

@Injectable()
export class CustomerTermService{
    constructor(
        @Inject('CUSTOMERTERMS_REPOSITORY') private readonly customerTermRepository: typeof CustomerTerm,
        private readonly termService:TermService,private readonly courseService:CourseService){

    }

    async createCustomerTerm(termId:number,customerId:number):Promise<CustomerTerm>{
        console.log(123456);
        const term=await this.termService.findOne(termId);
        console.log(term);
        const course=await this.courseService.findOne(term.courseId);
        console.log(course);

        if(!term){
            return null;
        }
        else if(term.currentCustomersOnCourse+1<course.maxNumberOfCustomers){
            const customerTerm=await this.customerTermRepository.create({termId,customerId});
            term.currentCustomersOnCourse=term.currentCustomersOnCourse+1;
            term.save();
            return customerTerm; 
        }
        else 
        {
            return null;
        }

    }
    
}