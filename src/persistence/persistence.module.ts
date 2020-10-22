import { Module } from "@nestjs/common";
import { CourseRepositoryModule } from "./course/course_repository.module";
import { TermRepositoryModule } from "./term/term_repository.module";
import { UserRepositoryModule } from "./user/user_repository.module";

@Module({
    imports:[UserRepositoryModule,CourseRepositoryModule,TermRepositoryModule],
    exports:[UserRepositoryModule,CourseRepositoryModule,TermRepositoryModule]
})
export class PersistenceModule{

}