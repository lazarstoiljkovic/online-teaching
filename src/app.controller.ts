import { Get } from '@nestjs/common';
import {Body, Controller, Post} from '@nestjs/common'

@Controller()
export class AppController{

    @Post()
    webhookPost(@Body() data){
        console.log(data);
        console.log('ovo je post method');
    }

    @Get()
    getFirst(){
        console.log('123456');
        return 123456;
    }
}