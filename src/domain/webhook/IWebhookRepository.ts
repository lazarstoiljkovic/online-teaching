import { PaginationDto } from "../user/pagination.dto";
import { WebhookDto } from "./webhook.dto";

export interface IWebhookRepository{
    createWebhook(webhookDto:WebhookDto);
    getWebhooks(paginationDto:PaginationDto);
    deleteWebhook(id:number);
    findWebhooksForEvent(name:string,event:string);
}