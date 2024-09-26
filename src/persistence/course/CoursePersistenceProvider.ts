import { CourseRepository } from "./course.repository";
import { Provider } from "@nestjs/common";

export const CourseRepoProvider:Provider={
    provide: 'CourseRepo',
    useClass: CourseRepository
}