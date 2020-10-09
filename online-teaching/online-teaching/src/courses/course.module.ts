import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import {CourseController} from './course.controller';
import { courseProvider } from "./course.provider";
import { CourseService } from "./course.service";

@Module({
    imports:[DatabaseModule],
    controllers:[CourseController],
    providers:[CourseService,...courseProvider],
    exports:[CourseService]
})
export class CourseModule{

}