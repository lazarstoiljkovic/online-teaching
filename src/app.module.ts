import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { TutorModule } from './tutors/tutor.module';
import {JwtModule} from '@nestjs/jwt';
import { CourseModule } from './courses/course.module';
import { TermModule } from './terms/term.module';
import { CustomerTermModule } from './customer_terms/customer_term.module';
import { CustomerModule } from './customers/customer.module';

@Module({
  imports: [
    DatabaseModule,
    TutorModule,
    AuthModule,
    CourseModule,
    TermModule,
    CustomerTermModule,
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
