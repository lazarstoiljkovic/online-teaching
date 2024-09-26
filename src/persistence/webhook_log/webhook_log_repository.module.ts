import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { WebhookLogRepoProvider } from './WebhookLogPersistenceModule'

@Module({
    imports:[DatabaseModule],
    providers:[WebhookLogRepoProvider],
    exports:[WebhookLogRepoProvider]    
})
export class WebhookLogRepositoryModule{
    
}