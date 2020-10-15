import { Controller, Body, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TutorDto } from '../tutors/dto/tutor.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { DoesUserExist } from './guards/doesUserExist.guard';
import { TutorService } from 'src/tutors/tutor.service';
import { CustomerService } from 'src/customers/customer.service';
import { CustomerDto } from 'src/customers/dto/customer.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UserRole } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        console.log(req.user);
        return await this.authService.login(req.user);
    }

    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(
        @Body() user:UserDto) {
            const result:any=await this.authService.signup(user);
            console.log(result);
            if(result.role===UserRole.CUSTOMER){
                const sent=this.authService.sendEmailVerification(result.email);
                if(sent){
                    return result;
                }
                else
                {
                    return 'Registration failed. Mail not sent'
                }
            }

            return result;
    }

    @Get('email/verify/:email')
    async verifyEmail(@Param() params){
        return await this.authService.verifyEmail(params.email);
    }
}