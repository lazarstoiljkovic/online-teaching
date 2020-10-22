import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CustomerTermController } from "./customer_term/controllers/customer_term.controller";
import { customerTermsProvider } from "../persistence/customer_term/customer_term.provider";
import { CustomerTermService } from "./customer_term/services/customer_term.service";

@Module({
    imports:[DatabaseModule],
    controllers:[CustomerTermController],
    providers:[CustomerTermService,...customerTermsProvider],
    exports:[CustomerTermService]
})
export class CustomerTermModule{

}