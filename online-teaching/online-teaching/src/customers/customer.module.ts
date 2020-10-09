import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CustomerService } from "./customer.service";
import {customerProvider} from './customer.provider';

@Module({
    imports:[DatabaseModule],
    providers:[CustomerService,...customerProvider],
    exports:[CustomerService]
})
export class CustomerModule{

}