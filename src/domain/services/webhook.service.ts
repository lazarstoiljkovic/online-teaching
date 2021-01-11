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
                auth_pass:'ncoded1'
            }
        });
    }

    private async createWebhookLog(webhookDto,calledMethod){
        const timestamp:Date=new Date();
        const webhookLogDto:WebhookLogDto={
            webhookId:webhookDto.id,
            timestamp:timestamp,
            calledMethod:calledMethod
        }


        this.webhookLogRepository.createWebhookLog(webhookLogDto);
    }

    public async sendToAllRegisteredClient(webhooks:any[],course){
        webhooks.forEach(async (row)=>{
            const webhookDto:WebhookDto=row;
            const result=await this.sendCourseEventToClient(webhookDto,'create-course',course);
        });
    }

    public async sendCourseEventToClient(webhookDto:any,calledMethod:string,payload:any){
        //console.log(webhookDto.id);
        //console.log(webhookDto.url);
        console.log('Payload');
        console.log(payload);
        this.createWebhookLog(webhookDto,calledMethod);
/*         try{
        await this.httpService.post(webhookDto.url,{payload}).toPromise();
        }catch(err){

        } */
        const pattern={cmd:'courseEvent'};
        console.log(pattern);

        return this.clientProxy.send(pattern,payload).toPromise();
    }
}