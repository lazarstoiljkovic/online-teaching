import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ApiModule } from "./api/api.module";
import { CustomerTermModule } from "./api/customer_term.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { JwtStrategy } from "./auth/guards/strategies/jwt.strategy";
import { DatabaseModule } from "./database/database.module";

@Module({
    imports:[DatabaseModule,ApiModule],
    providers:[JwtStrategy],
    controllers:[AppController],
    exports:[]
})
export class AppModule{

}