import { HttpModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { PersistenceModule } from "src/persistence/persistence.module";
import { MathService } from "./math.service";
import { WebhookService } from "./webhook.service";


@Module({
    imports:[PersistenceModule,HttpModule],
    providers:[MathService,WebhookService],
    exports:[MathService,WebhookService]
})
export class ServicesModule{

}