import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CustomerService } from "./customer.service";
import {customerProvider} from './customer.provider';
import { CustomerTermModule } from "src/customer_terms/customer_term.module";
import { CourseModule } from "src/courses/course.module";
import { CustomerController } from "./customer.controller";

@Module({
    imports:[DatabaseModule,CustomerTermModule,CourseModule],
    providers:[CustomerService,...customerProvider],
    controllers:[CustomerController],
    exports:[CustomerService]
})
export class CustomerModule{

}