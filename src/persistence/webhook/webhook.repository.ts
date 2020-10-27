import { IWebhookRepository } from "src/domain/webhook/IWebhookRepository";
import { WebhookDto } from "src/domain/webhook/webhook.dto";
import { ModelRepository } from "../model/model.repository";
import { Webhook } from "./webhook.entity";

export class WebhookRepository implements IWebhookRepository{
    webHookRepo=new ModelRepository(Webhook);

    createWebhook(webhookDto: WebhookDto) {
        return this.webHookRepo.create({...webhookDto});
    }
    getWebhooks() {
        //this.webHookRepo.get(undefined,undefined,undefined,undefined);
        return this.webHookRepo.get();
    }
    deleteWebhook(id: number) {
        const filterOptions={id:id};
        return this.webHookRepo.delete(filterOptions);
    }
    
}