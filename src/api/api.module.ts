import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/auth/guards/strategies/jwt.strategy";
import { LocalStrategy } from "src/auth/guards/strategies/local.strategy";
import { DomainModule } from "src/domain/domain.module";
import { courseProvider } from "src/persistence/course/course.provider";
import { customerTermsProvider } from "src/persistence/customer_term/customer_term.provider";
import { termProvider } from "src/persistence/term/term.provider";
import { userProvider } from "src/persistence/user/user.provider";
import { CourseController } from "./course/controllers/course.controller";
import { CourseService } from "./course/services/course.service";
import { CustomerTermController } from "./customer_term/controllers/customer_term.controller";
import { CustomerTermService } from "./customer_term/services/customer_term.service";
import { TermController } from "./term/controllers/term.controller";
import { TermService } from "./term/services/term.service";
import { AuthController } from "./user/controllers/auth.controller";
import { UserController } from "./user/controllers/user.controller";
import { AuthService } from "./user/services/auth.service";
import { UserService } from "./user/services/user.service";

@Module({
    controllers:[UserController,AuthController,CourseController,TermController,CustomerTermController],
    providers:[UserService,AuthService,CourseService,TermService,CustomerTermService,LocalStrategy,JwtStrategy,...userProvider,...termProvider,...courseProvider,...customerTermsProvider],
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