import { Module } from "@nestjs/common";
import { CourseRepositoryModule } from "./course/course_repository.module";
import { UserRepositoryModule } from "./user/user_repository.module";

@Module({
    imports:[UserRepositoryModule,CourseRepositoryModule],
    exports:[UserRepositoryModule,CourseRepositoryModule]
})
export class PersistenceModule{

}