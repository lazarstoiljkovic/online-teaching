import { Module } from "@nestjs/common";
import { CourseRepositoryModule } from "src/persistence/course/course_repository.module";
import { CourseCRUD } from "./CourseCRUD";

@Module({
    imports:[CourseRepositoryModule],
    providers:[CourseCRUD],
    exports:[CourseCRUD]
})
export class CourseModule{}