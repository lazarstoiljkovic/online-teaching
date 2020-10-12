import { Body, Controller, Param, Post, UseGuards,Request, NotFoundException } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TermDto } from "./dto/term.dto";
import { TermService } from "./term.service";

@Controller('terms')
export class TermController{
    constructor(private readonly termService:TermService){

    }

    @UseGuards(JwtAuthGuard)
    @Post('/term/create/:id')
    async createTerm(
        @Param('id') courseId:number,
        @Body() termDto:TermDto,
        @Request() req
    ){
        const res= await this.termService.createTerm(termDto,courseId,req.user.id);

        if(!res){
            throw new NotFoundException('Cant add term for this course');
        }

        return res;
    }
}