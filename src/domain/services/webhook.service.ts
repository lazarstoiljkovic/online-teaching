import { HttpService } from "@nestjs/common";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory ,Transport} from "@nestjs/microservices";
import dayjs from "dayjs";
import { IWebhookRepository } from "../webhook/IWebhookRepository";
import { WebhookDto } from "../webhook/webhook.dto";
import { IWebhookLogRepository } from "../webhook_log/IWebhookLogRepository";
import { WebhookLogDto } from "../webhook_log/webhook_log.dto";

@Injectable()
export class WebhookService{

    private clientProxy:ClientProxy;

    constructor(
        @Inject('WebhookRepo') private readonly webhookRepository:IWebhookRepository,
        @Inject('WebhookLogRepo') private readonly webhookLogRepository:IWebhookLogRepository,
        private readonly httpService:HttpService){
        this.clientProxy=ClientProxyFactory.create({
            transport:Transport.REDIS,
            options:{
                url:'redis://localhost:6379',
                auth_pass:'K/5j67m6cNx7X1+UUAV92bxxQNP+KTWMKr48FIc7R1fv6vEz2/dDqJlbVtUNkLwOgQ6fyruRanSmAdqA'
            }
        });
    }

    private async createWebhookLog(webhookDto,calledMethod){
        const timestamp:Date=new Date(Date.now());
        const webhookLogDto:WebhookLogDto={
            webhookId:webhookDto.id,
            timestamp:timestamp,
            calledMethod:calledMethod
        }


        this.webhookLogRepository.createWebhookLog(webhookLogDto);
    }

    public async sendCourseEventToClient(webhookDto:any,calledMethod:string){
        console.log(webhookDto.id);
        console.log(webhookDto.url);
        this.createWebhookLog(webhookDto,calledMethod);
        this.httpService.post(webhookDto.url,webhookDto);
/*         const pattern={cmd:'courseEvent'};
        return this.clientProxy.send(pattern,webhookDto); */
    }
}