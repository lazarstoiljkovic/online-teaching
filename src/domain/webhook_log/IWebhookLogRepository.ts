import { WebhookLog } from "src/persistence/webhook_log/webhook_log.entity";
import { PaginationDto } from "../user/pagination.dto";
import { WebhookLogDto } from "./webhook_log.dto";

export interface IWebhookLogRepository{
    createWebhookLog(webhookLogDto:WebhookLogDto);
    getWebhooksLogs(paginationDto:PaginationDto);
    delteWebhookLog(id:number);
}