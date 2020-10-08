import { Controller, Body, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TutorDto } from '../tutors/dto/tutor.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { DoesUserExist } from './guards/doesUserExist.guard';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        //console.log(req);
        console.log(req.user);
        return await this.authService.login(req.user);
    }

    @UseGuards(DoesUserExist)
    @Post('auth/signup')
    async signUp(
        @Body() tutor:TutorDto) {
            //const tutor=new TutorDto(firstName,lastName,email,username,password);
            return await this.authService.signup(tutor);
    }

    //protect rooutes from non authorized users with jwt strategy
    @UseGuards(JwtAuthGuard)
    @Get('Profile')
    getProfile(@Request() req){
        return req.user;
    }
}