import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { TutorModule } from './tutors/tutor.module';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    TutorModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
