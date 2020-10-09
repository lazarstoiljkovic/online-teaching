import { Body, Controller, Delete, Get, NotFoundException, Param, Post,Put,Request, UseGuards } from "@nestjs/common";
import { IsEmail } from "sequelize-typescript";
import { courseProvider } from "src/courses/course.provider";
import { TutorDto } from "./dto/tutor.dto";
import { TutorService } from "./tutor.service";
import {CourseDto} from '../courses/dto/course.dto'
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { tutorProvider } from "./tutor.provider";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";

@Controller('tutors')
export class TutorController{
    constructor(private readonly tutorService:TutorService){

    }


    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(){
        return this.tutorService.getAllTutors();
    }

    @UseGuards(JwtAuthGuard)
    @Get('tutor/:username')
    async findById(@Param('username') username){
        const tutor=await this.tutorService.getTutorByUsername(username);
        if(!tutor){
            throw new NotFoundException('This tutor doesnt exist');
        }

        return tutor;
    }

    @UseGuards(JwtAuthGuard)
    @Put('tutor/update')
    async updateTutor(
        @Request() req,
        @Body()tutorDto:TutorDto){
            const updateTutor=await this.tutorService.updateTutor(req.user.id,tutorDto);
            if(updateTutor[0]===0){
                throw new NotFoundException('Cant update this tutor');
            }

            return updateTutor;

    }

    @UseGuards(JwtAuthGuard)
    @Delete('tutor/delete')
    async deleteTutor(
        @Request() req
    ){
        const deleted=await this.tutorService.deleteTutor(req.user.id);

        if(deleted===0){
            throw new NotFoundException('Cant delete this tutor');
        }

        return 'Successfully deleted';
    }
}