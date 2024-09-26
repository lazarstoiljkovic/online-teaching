import { IsNotEmpty } from "class-validator";


export class WebhookDto{

    @IsNotEmpty()
    webhookName:string;

    @IsNotEmpty()
    isActive:boolean;

    @IsNotEmpty()
    events:string[];

    @IsNotEmpty()
    url:string;
    
}