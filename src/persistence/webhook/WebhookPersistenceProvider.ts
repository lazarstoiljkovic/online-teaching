import { Provider } from "@nestjs/common";
import { WebhookRepository } from "./webhook.repository";

export const WebhookRepoProvider:Provider={
    provide: 'WebhookRepo',
    useClass: WebhookRepository
}