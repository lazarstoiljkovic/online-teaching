import { Module } from "@nestjs/common";
import { CourseModule } from "src/courses/course.module";
import { CustomerModule } from "src/customers/customer.module";
import { CustomerService } from "src/customers/customer.service";
import { DatabaseModule } from "src/database/database.module";
import { TermModule } from "src/terms/term.module";
import { CustomerTermController } from "./customer_term.controller";
import { customerTermsProvider } from "./customer_term.provider";
import { CustomerTermService } from "./customer_term.service";

@Module({
    imports:[DatabaseModule,CourseModule,TermModule],
    controllers:[CustomerTermController],
    providers:[CustomerTermService,...customerTermsProvider],
    exports:[CustomerTermService]
})
export class CustomerTermModule{

}