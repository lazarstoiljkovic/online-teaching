import { Body, Controller, Param, Post, UseGuards,Request, Put, Get, Delete } from "@nestjs/common";
import { Roles } from "src/guards/decorators/roles.decorator";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { ModelInstnaceAccessGurad } from "src/guards/modelInstanceAccess.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { TermDto } from "../../models/dtos/term.dto";
import { TermService } from "../services/term.service";

@Controller('terms')
export class TermController{
    constructor(private readonly termService:TermService){

    }

    @Roles('tutor')
    @UseGuards(JwtAuthGuard,ModelInstnaceAccessGurad,RolesGuard)
    @Post(':id')
    async createTerm(
        @Param('id') courseId:number,
        @Body() termDto:TermDto,
        @Request() req
    ){
        const res=await this.termService.createTerm(termDto,courseId,req.user.id);

        if(!res){
            return 'Cant add term';
        }

        return res;
    }

    @Roles('tutor')
    @UseGuards(RolesGuard)
    @UseGuards(ModelInstnaceAccessGurad)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateTerm(@Param('id')termId:number,@Body() termDto:TermDto) {
        return this.termService.updateTerm(termId,termDto);
    }

    @Roles('tutor')
    @UseGuards(RolesGuard)
    @UseGuards(ModelInstnaceAccessGurad)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteTerm(@Param('id')termId:number) {
        return this.termService.deleteTerm(termId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getTermWithId(@Param('id')termId:number) {
        return this.termService.findOne(termId);
    }
}