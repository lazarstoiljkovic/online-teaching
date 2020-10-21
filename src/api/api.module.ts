import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/auth/guards/strategies/jwt.strategy";
import { LocalStrategy } from "src/auth/guards/strategies/local.strategy";
import { DomainModule } from "src/domain/domain.module";
import { courseProvider } from "src/persistence/course/course.provider";
import { termProvider } from "src/persistence/term/term.provider";
import { userProvider } from "src/persistence/user/user.provider";
import { CourseController } from "./course/controllers/course.controller";
import { CourseService } from "./course/services/course.service";
import { AuthController } from "./user/controllers/auth.controller";
import { UserController } from "./user/controllers/user.controller";
import { AuthService } from "./user/services/auth.service";
import { UserService } from "./user/services/user.service";

@Module({
    controllers:[UserController,AuthController,CourseController],
    providers:[UserService,AuthService,CourseService,LocalStrategy,JwtStrategy,...userProvider,...termProvider,...courseProvider],
    imports:[
        DomainModule,
        PassportModule,
        JwtModule.register({
        secret:'secret-key',
        signOptions: { expiresIn: '48h'}
    })],
    exports:[UserService]
})
export class ApiModule{

}