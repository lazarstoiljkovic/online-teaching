import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CourseService } from '../../api/course/services/course.service';

@Injectable()
export class ModelInstnaceAccessGurad implements CanActivate {
    constructor(private readonly courseService: CourseService) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: any = context.switchToHttp().getRequest<Request>();
        const result = request.user;
        const param = request.params.id;

        const res = await this.courseService.findOne(param);
        if (res.tutorId === result.id) {
            return true;
        }
        else {
            return false;
        }
    }
}