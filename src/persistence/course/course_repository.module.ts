import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { courseProvider } from "./course.provider";
import { CourseRepoProvider } from "./CoursePersistenceProvider";

@Module({
    imports:[DatabaseModule],
    providers:[CourseRepoProvider,...courseProvider],
    exports:[CourseRepoProvider,...courseProvider]
})
export class CourseRepositoryModule{

}