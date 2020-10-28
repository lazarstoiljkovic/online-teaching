import { Inject, Injectable } from "@nestjs/common";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { WebhookDto } from "src/domain/webhook/webhook.dto";
import { WebhookCRUD } from "src/domain/webhook/WebhookCRUD";
import { WebhookLogDto } from "src/domain/webhook_log/webhook_log.dto";

@Injectable()
export class WebhookApiService{
    constructor(private readonly webhookCRUD:WebhookCRUD){

    }

    async createWebhook(webhookDto:WebhookDto){
        return this.webhookCRUD.createWebhook(webhookDto);
    }

    async getWebhooks(paginationDto:PaginationDto){
        return this.webhookCRUD.getWebhooks(paginationDto);
    }

    async deleteWebhook(id:number){
        return this.webhookCRUD.deleteWebhook(id);
    }
}