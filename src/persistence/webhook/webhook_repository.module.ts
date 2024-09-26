import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { webhookProvider } from "./webhook.provider";
import { WebhookRepoProvider } from './WebhookPersistenceProvider'
@Module({
    imports:[DatabaseModule],
    providers:[WebhookRepoProvider,...webhookProvider],
    exports:[WebhookRepoProvider,...webhookProvider]    
})
export class WebhookRepositoryModule{

}