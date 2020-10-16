import { Module } from "@nestjs/common";
import { CourseModule } from "src/modules/course.module";
import { DatabaseModule } from "src/database/database.module";
import { TermModule } from "src/modules/term.module";
import { CustomerTermController } from "./controllers/customer_term.controller";
import { customerTermsProvider } from "./providers/customer_term.provider";
import { CustomerTermService } from "./services/customer_term.service";

@Module({
    imports:[DatabaseModule,CourseModule,TermModule],
    controllers:[CustomerTermController],
    providers:[CustomerTermService,...customerTermsProvider],
    exports:[CustomerTermService]
})
export class CustomerTermModule{

}