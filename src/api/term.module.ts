import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { TermController } from "./term/controllers/term.controller";
import { termProvider } from "../persistence/term/term.provider";
import { TermService } from "./term/services/term.service";
import { CourseService } from "./course/services/course.service";

@Module({
    imports:[DatabaseModule],
    providers:[TermService,CourseService,...termProvider],
    controllers:[TermController],
    exports:[TermService]
})
export class TermModule{

}