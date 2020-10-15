import { Body, Controller, Param, Post, UseGuards,Request, NotFoundException, Put, Get, Delete } from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ModelInstnaceAccessGurad } from "src/auth/guards/modelInstanceAccess.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { TermDto } from "./dto/term.dto";
import { termProvider } from "./term.provider";
import { TermService } from "./term.service";

@Controller('terms')
export class TermController{
    constructor(private readonly termService:TermService){

    }

    @Roles('tutor')
    @UseGuards(RolesGuard)
    @UseGuards(ModelInstnaceAccessGurad)
    @UseGuards(JwtAuthGuard)
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
    async updateTerm(@Param('id')termId:number,@Body()termDto:TermDto) {
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