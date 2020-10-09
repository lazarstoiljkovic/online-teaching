import { Module } from "@nestjs/common";
import { CourseModule } from "src/courses/course.module";
import { DatabaseModule } from "src/database/database.module";
import { TutorModule } from "src/tutors/tutor.module";
import { TermController } from "./term.controller";
import { termProvider } from "./term.provider";
import { TermService } from "./term.service";

@Module({
    imports:[DatabaseModule,TutorModule,CourseModule],
    providers:[TermService,...termProvider],
    controllers:[TermController]
})
export class TermModule{

}