import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { WebhookDto } from "src/domain/webhook/webhook.dto";
import { WebhookService } from "../services/webhook.service";

@Controller('webhooks')
export class WebhookController{
    constructor(private readonly webhookService:WebhookService){

    }

    @Post()
    createWebhook(@Body() webhookDto:WebhookDto){

        return this.webhookService.createWebhook(webhookDto);
    }

    @Get()
    getWebhooks(@Query() paginationDto:PaginationDto ){
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);

        return this.webhookService.getWebhooks(paginationDto);
    }

    @Delete(':id')
    deleteWebhook(@Param('id') id:number){
        return this.webhookService.deleteWebhook(id);
    }

}