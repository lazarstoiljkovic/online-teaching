import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { courseProvider } from "src/courses/course.provider";
import { DatabaseModule } from "src/database/database.module";
import { TutorController } from "./tutor.controller";
import { tutorProvider } from "./tutor.provider";
import { TutorService } from "./tutor.service";
import {JwtModule,JwtService} from '@nestjs/jwt';
import { tokenProvider } from "src/tokens/token.provider";

@Module({
    imports:[DatabaseModule],
    controllers:[TutorController],
    providers:[TutorService,...tutorProvider,...courseProvider,...tokenProvider],
    exports:[TutorService]
})
export class TutorModule{

}