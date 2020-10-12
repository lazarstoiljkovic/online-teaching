import { Body, Controller, Param, Post, UseGuards,Request, NotFoundException } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CustomerTermService } from "./customer_term.service";

@Controller('customer_terms')
export class CustomerTermController{
    constructor(private readonly customerTermService:CustomerTermService){

    }

    @UseGuards(JwtAuthGuard)
    @Post('/customer_term/create/:termId')
    async createCustomerTerm(
        @Param('termId') termId:number,
        @Request() req){
            const result=await this.customerTermService.createCustomerTerm(termId,req.user.id);
            if(!result){
                throw new NotFoundException('This term doesnt exist');
            }
            else
            {
                return result;
            }
    }
}