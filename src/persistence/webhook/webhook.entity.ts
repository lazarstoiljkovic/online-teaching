import { Column, DataType, HasMany, Table } from "sequelize-typescript";
import { Model } from "sequelize-typescript";
import { WebhookLog } from "../webhook_log/webhook_log.entity";

@Table
export class Webhook extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    webhookName:string;

    @Column({
        type:DataType.BOOLEAN,
        allowNull:false,
        defaultValue:true
    })
    isActive:boolean;

    @Column({
        type:DataType.ARRAY(DataType.STRING),
        allowNull:false
    })
    events:string[];

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    url:string;

    @HasMany(()=>WebhookLog)
    webhookLogs:WebhookLog[];
}