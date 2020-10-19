import { Controller, Param, Post, UseGuards,Request, NotFoundException } from "@nestjs/common";
import { Roles } from "src/guards/decorators/roles.decorator";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { CustomerTermService } from "../services/customer_term.service";

@Controller('customer_terms')
export class CustomerTermController{
    constructor(private readonly customerTermService:CustomerTermService){

    }

    @Roles('customer')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/:termId')
    async createCustomerTerm(
        @Param('termId') termId:number,
        @Request() req){
            console.log('klklklkl');
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