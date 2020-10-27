import { Inject } from "@nestjs/common";
import { PaginationDto } from "../user/pagination.dto";
import { IWebhookLogRepository } from "./IWebhookLogRepository";
import { WebhookLogDto } from "./webhook_log.dto";

export class WebhookLogCRUD{
    constructor(@Inject('WebhookLogRepo') private readonly webhookLogRepository:IWebhookLogRepository){

    }

    public async createWebhookLog(webhookLogDto:WebhookLogDto){
        return this.webhookLogRepository.createWebhookLog(webhookLogDto);
    }

    public async getWebhooksLogs(paginationDto:PaginationDto){
        return this.webhookLogRepository.getWebhooksLogs(paginationDto);
    }

    public async deleteWebhookLog(id:number){
        return this.webhookLogRepository.delteWebhookLog(id);
    }
}