import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CourseController } from '../modules/controllers/course.controller';
import { courseProvider } from "../modules/providers/course.provider";
import { CourseService } from "../modules/services/course.service";
import { PaginationService } from "./services/pagination.service";


@Module({
    imports:[DatabaseModule],
    controllers:[CourseController],
    providers:[CourseService,PaginationService,...courseProvider],
    exports:[CourseService]
})
export class CourseModule{

}