import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TutorModule } from './tutors/tutor.module';

@Module({
  imports: [
    DatabaseModule,
    TutorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
