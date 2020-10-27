import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport } from '@nestjs/microservices'

const logger=new Logger('Main');

const microserviceOptions={
  transport:Transport.REDIS,
  options:{
    url:'redis://localhost:6379',
    auth_pass:'K/5j67m6cNx7X1+UUAV92bxxQNP+KTWMKr48FIc7R1fv6vEz2/dDqJlbVtUNkLwOgQ6fyruRanSmAdqA'
  }

}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,microserviceOptions);
  await app.listen(()=>{
    logger.log('Microservice is listening...');
  });
}
bootstrap();
