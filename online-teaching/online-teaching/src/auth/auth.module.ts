import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TutorModule } from "src/tutors/tutor.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtModule,JwtService } from '@nestjs/jwt';
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports:[TutorModule,
        PassportModule,
        JwtModule.register({
        secret:'secret-key',
        signOptions: { expiresIn: '48h'}
    })],
    controllers:[AuthController],
    providers:[AuthService,LocalStrategy,JwtStrategy],
    exports:[AuthService]
})
export class AuthModule{

}