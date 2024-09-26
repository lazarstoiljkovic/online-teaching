import { Module } from "@nestjs/common";
import { WebhookLogRepositoryModule } from "src/persistence/webhook_log/webhook_log_repository.module";
import { WebhookLogCRUD } from "./WebhookLogCRUD";

@Module({
    imports:[WebhookLogRepositoryModule],
    providers:[WebhookLogCRUD],
    exports:[WebhookLogCRUD]
})
export class WebhookLogModule{

}