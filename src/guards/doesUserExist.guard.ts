import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../modules/services/user.service';

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly userService: UserService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {

        const userEmail = await this.userService.getUserByEmail(request.body.email);
        if (userEmail) {
            throw new ForbiddenException('This email already exist');
        }
        const userUsername=await this.userService.getUserByUsername(request.body.username);
        if(userUsername){
            throw new ForbiddenException('This username already exist');
        }
        return true;

    }
}