import { Inject, Injectable } from "@nestjs/common";
import { TermService } from "src/terms/term.service";
import { CustomerTerm } from "./customer_term.entity";

@Injectable()
export class CustomerTermService{
    constructor(
        @Inject('CUSTOMERTERMS_REPOSITORY') private readonly customerTermRepository: typeof CustomerTerm,
        private readonly termService:TermService){

    }

    async createCustomerTerm(termId:number,customerId:number):Promise<CustomerTerm>{
        const result=await this.termService.findOne(termId);

        if(!result){
            return null;
        }else
        {
            return await this.customerTermRepository.create({termId,customerId});
        }

    }
    
}