import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { DatabaseModule } from '../database/database.module';
import {JwtModule} from '@nestjs/jwt';
import { CourseModule } from './course.module';
import { TermModule } from './term.module';
import { CustomerTermModule } from './customer_term.module';
import { UserModule } from './user.module';
import { VerifyEmailMiddleware } from '../middlewares/verifyEmail.middleware';
import { AuthController } from '../modules/controllers/auth.controller';
import { AppGateway } from 'src/websockets/app.gateway';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CourseModule,
    TermModule,
    CustomerTermModule,
    UserModule
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(VerifyEmailMiddleware).forRoutes(AuthController);
  }
}
