import { Inject, Injectable } from "@nestjs/common";
import { Customer } from "./customer.entity";
import { CustomerDto } from "./dto/customer.dto";

@Injectable()
export class CustomerService{
    constructor(
        @Inject('CUSTOMERS_REPOSITORY') private readonly customerRepository: typeof Customer){

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
}