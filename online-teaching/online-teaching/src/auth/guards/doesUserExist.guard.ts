import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Customer } from 'src/customers/customer.entity';
import { CustomerService } from 'src/customers/customer.service';
import { TutorService } from '../../tutors/tutor.service';

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly tutorService: TutorService,
        private readonly customerService:CustomerService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
/*         if(this.flag){
            return this.validateTutor(request);
        }
        else{
            return this.validateCustomer(request);
        } */

        const tutorEmail = await this.tutorService.getTutorByEmail(request.body.email);
        if (tutorEmail) {
            throw new ForbiddenException('This email already exist');
        }
        const tutorUsername=await this.tutorService.getTutorByUsername(request.body.username);
        if(tutorUsername){
            throw new ForbiddenException('This username already exist');
        }
        return true;

    }

    private async validateTutor(request){
        const tutorEmail = await this.tutorService.getTutorByEmail(request.body.email);
        if (tutorEmail) {
            throw new ForbiddenException('This email already exist');
        }
        const tutorUsername=await this.tutorService.getTutorByUsername(request.body.username);
        if(tutorUsername){
            throw new ForbiddenException('This username already exist');
        }
        return true;
    }

    private async validateCustomer(request){
        const customerEmail = await this.customerService.getCustomerByEmail(request.body.email);
        if (customerEmail) {
            throw new ForbiddenException('This email already exist');
        }
        const customerUsername=await this.customerService.getCustomerByUsername(request.body.username);
        if(customerUsername){
            throw new ForbiddenException('This username already exist');
        }
        return true;
    }
}