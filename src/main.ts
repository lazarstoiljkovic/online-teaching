import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {ValidateInputPipe} from './pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(3000);
}
bootstrap();
