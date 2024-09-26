import { IsNotEmpty } from "class-validator";

export class WebhookLogDto{

    @IsNotEmpty()
    timestamp:Date;

    @IsNotEmpty()
    calledMethod:string;

    @IsNotEmpty()
    webhookId:number;
}