import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport } from '@nestjs/microservices'

const logger=new Logger('Main');

const microserviceOptions={
  transport:Transport.REDIS,
  options:{
    url:'redis://localhost:6379',
    auth_pass:'ncoded1'
  }

}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,microserviceOptions);
  await app.listen(()=>{
    logger.log('Microservice is listening...');
  });
}
bootstrap();
