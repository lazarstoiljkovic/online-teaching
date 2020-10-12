import { Inject, Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { CourseService } from "src/courses/course.service";
import { Customer } from "./customer.entity";
import { CustomerDto } from "./dto/customer.dto";

@Injectable()
export class CustomerService{
    constructor(
        @Inject('CUSTOMERS_REPOSITORY') private readonly customerRepository: typeof Customer,
        private readonly courseService:CourseService){

    }

    async createCustomer(customerDto:CustomerDto){
        return await this.customerRepository.create(customerDto);
    }

    async getCustomerByEmail(email:string):Promise<Customer>{
        return this.customerRepository.findOne({
            where:{email:email}
        });
    }

    async getCustomerByUsername(username:string):Promise<Customer>{
        return this.customerRepository.findOne({
            where:{username:username}
        });
    }

    async getAllCoursesForTutor(tutorId:number){
        const result=await this.courseService.findAllCoursesForTutor(tutorId);
        if(!result){
            return null;
        }

        return result;
    }
}