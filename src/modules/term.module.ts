import { Module } from "@nestjs/common";
import { CourseModule } from "src/modules/course.module";
import { DatabaseModule } from "src/database/database.module";
import { TermController } from "./controllers/term.controller";
import { termProvider } from "./providers/term.provider";
import { TermService } from "./services/term.service";

@Module({
    imports:[DatabaseModule,CourseModule],
    providers:[TermService,...termProvider],
    controllers:[TermController],
    exports:[TermService]
})
export class TermModule{

}