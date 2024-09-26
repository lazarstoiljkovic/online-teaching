import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "../api/user/services/auth.service";
import { LocalStrategy } from "./guards/strategies/local.strategy";
import { JwtModule,JwtService } from '@nestjs/jwt';
import { AuthController } from "../api/user/controllers/auth.controller";
import { JwtStrategy } from "./guards/strategies/jwt.strategy";
import { ApiModule } from "src/api/api.module";


@Module({
    imports:[
        ApiModule,
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
