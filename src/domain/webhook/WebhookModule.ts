import { Module } from "@nestjs/common";
import { WebhookRepositoryModule } from "src/persistence/webhook/webhook_repository.module";
import { WebhookCRUD } from "./WebhookCRUD";

@Module({
    imports:[WebhookRepositoryModule],
    providers:[WebhookCRUD],
    exports:[WebhookCRUD]
})
export class WebhookModule{

}