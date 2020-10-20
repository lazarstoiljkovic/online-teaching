import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "../guards/strategies/local.strategy";
import { JwtModule,JwtService } from '@nestjs/jwt';
import { AuthController } from "../modules/controllers/auth.controller";
import { JwtStrategy } from "../guards/strategies/jwt.strategy";
import { UserModule } from "src/modules/user.module";
import { VerifyEmailMiddleware } from "../middlewares/verifyEmail.middleware";

@Module({
    imports:[
        UserModule,
        PassportModule,
        JwtModule.register({
        secret:'secret-key',
        signOptions: { expiresIn: '48h'}
    })],
    controllers:[AuthController],
    providers:[AuthService,LocalStrategy,JwtStrategy],
    exports:[AuthService]
})
export class AuthModule {
    
}
