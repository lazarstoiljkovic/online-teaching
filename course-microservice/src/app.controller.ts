import { Controller, Get, HttpService } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private httpService:HttpService) {}

  @MessagePattern({cmd: 'add' })
  accumulate(data: number[]):number{
    console.log(123456);
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern({cmd: 'courseEvent' })
  sendCourseEventToClient(data){
    console.log('blablablablabla');
    console.log(data);
    this.httpService.post(data.url,data);
    //console.log('blablablablabla');
    return {pera:"Pera"};
  }
}
