import { HttpService } from "@nestjs/common";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory ,Transport} from "@nestjs/microservices";
import { IWebhookRepository } from "../webhook/IWebhookRepository";
import { WebhookDto } from "../webhook/webhook.dto";

@Injectable()
export class WebhookService{

    private clientProxy:ClientProxy;

    constructor(@Inject('WebhookRepo') private readonly webhookRepository:IWebhookRepository,private readonly httpService:HttpService){
        this.clientProxy=ClientProxyFactory.create({
            transport:Transport.REDIS,
            options:{
                url:'redis://localhost:6379',
                auth_pass:'K/5j67m6cNx7X1+UUAV92bxxQNP+KTWMKr48FIc7R1fv6vEz2/dDqJlbVtUNkLwOgQ6fyruRanSmAdqA'
            }
        });
    }

    public async findWebhook(name:string,event:string){
        const webhooks=await this.webhookRepository.findWebhooksForEvent(name,event);
        console.log(webhooks);
        return webhooks;
    }

    public async sendCourseEventToClient(webhookDto:WebhookDto){
        const pattern={cmd:'courseEvent'};
        return this.clientProxy.send(pattern,webhookDto);
    }
}