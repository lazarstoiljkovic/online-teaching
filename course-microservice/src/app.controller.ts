import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'add' })
  accumulate(data: number[]):number{
    console.log(123456);
    return (data || []).reduce((a, b) => a + b);
  }
}
