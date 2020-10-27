import { Webhook } from './webhook.entity';

export const webhookProvider = [
    {
      provide: 'WEBHOOKS_REPOSITORY',
      useValue: Webhook,
    },
];