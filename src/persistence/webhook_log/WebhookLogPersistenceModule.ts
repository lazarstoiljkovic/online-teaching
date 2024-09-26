import { Provider } from "@nestjs/common";
import { WebhookLogRepository } from './webhook_log.repository'

export const WebhookLogRepoProvider:Provider = { 
    provide: 'WebhookLogRepo',
    useClass: WebhookLogRepository
}