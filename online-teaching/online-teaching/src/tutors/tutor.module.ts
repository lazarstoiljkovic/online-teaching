import { Module } from "@nestjs/common";
import { courseProvider } from "src/courses/course.provider";
import { DatabaseModule } from "src/database/database.module";
import { TutorController } from "./tutor.controller";
import { tutorProvider } from "./tutor.provider";
import { TutorService } from "./tutor.service";

@Module({
    imports:[DatabaseModule],
    controllers:[TutorController],
    providers:[TutorService,...tutorProvider,...courseProvider],
    exports:[TutorService]
})
export class TutorModule{

}