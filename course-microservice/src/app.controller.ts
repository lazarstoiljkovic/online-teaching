import { Controller, Get, HttpService } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private httpService:HttpService) {}

  @MessagePattern({cmd: 'courseEvent' })
  sendCourseEventToClient(data){

    try{
      this.httpService.post(data.url,data).toPromise();
    }
    catch(error){
      console.log(error);
    }

    return {pera:"Pera"};
  }
}
