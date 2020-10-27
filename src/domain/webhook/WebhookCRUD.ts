import { Inject } from "@nestjs/common";
import { PaginationDto } from "../user/pagination.dto";
import { IWebhookRepository } from "./IWebhookRepository";
import { WebhookDto } from "./webhook.dto";

export class WebhookCRUD{
    constructor(@Inject('WebhookRepo') private readonly webhookRepository:IWebhookRepository){

    }

    public async createWebhook(webhookDto:WebhookDto){
        return this.webhookRepository.createWebhook(webhookDto);
    }

    public async getWebhooks(paginationDto:PaginationDto){
        return this.webhookRepository.getWebhooks(paginationDto);
    }

    public async deleteWebhook(id:number){
        return this.webhookRepository.deleteWebhook(id);
    }
}