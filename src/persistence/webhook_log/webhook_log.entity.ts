import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Webhook } from "../webhook/webhook.entity";

@Table
export class WebhookLog extends Model{

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    timestamp:Date;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    calledMethod:string;

    @BelongsTo(()=>Webhook,{onDelete:'cascade'})
    webhook:Webhook;

    @ForeignKey(()=>Webhook)
    webhookId:number;
}