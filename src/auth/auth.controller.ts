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
            return this.authService.signup(user);
    }


    
    @Post('customerSignUp')
    async signupCustomer(
        @Body() customerDto:CustomerDto){
            try{
                customerDto.validEmail=false;
                await this.authService.registerCustomer(customerDto);
                const sent=this.authService.sendEmailVerification(customerDto.email);
                if(sent){
                    return "User Registered successfully"; 
                }
                else
                {
                    return "Registration failed. Mail not sent"
                }
            }
            catch(error){
                return error;
            }
    }

    @UseGuards(AuthGuard('local'))
    @Post('customerLogin')
    async customerLogin(@Request() req){
        return await this.authService.loginCustomer(req.user);
    }


    @Get('email/verify/:email')
    async verifyEmail(@Param() params){
        return await this.authService.verifyEmail(params.email);
    }



    //protect rooutes from non authorized users with jwt strategy
    @UseGuards(JwtAuthGuard)
    @Get('Profile')
    getProfile(@Request() req){
        return req.user;
    }
}