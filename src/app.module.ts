import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
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
import { UserModule } from './users/user.module';
import { VerifyEmailMiddleware } from './auth/middlewares/verifyEmail.middleware';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CourseModule,
    TermModule,
    CustomerTermModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(VerifyEmailMiddleware).forRoutes(AuthController);
  }
}
