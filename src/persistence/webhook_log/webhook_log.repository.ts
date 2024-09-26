import { PaginationDto } from '../../domain/user/pagination.dto';
import {IWebhookLogRepository} from '../../domain/webhook_log/IWebhookLogRepository'
import { WebhookLogDto } from '../../domain/webhook_log/webhook_log.dto';
import { ModelRepository } from "../model/model.repository";
import {WebhookLog} from './webhook_log.entity'

export class WebhookLogRepository implements IWebhookLogRepository{
    webhookLogRepo=new ModelRepository(WebhookLog);

    createWebhookLog(webhookLogDto: WebhookLogDto) {
        return this.webhookLogRepo.create({...webhookLogDto})
    }
    getWebhooksLogs(paginationDto: PaginationDto) {

        return this.webhookLogRepo.get(paginationDto);
    }
    delteWebhookLog(id: number) {
        const filterOptions={id:id};
        return this.webhookLogRepo.delete(filterOptions);
    }
    
}