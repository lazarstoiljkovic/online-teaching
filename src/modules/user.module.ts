import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UserController } from "./controllers/user.controller";
import { termProvider } from "./providers/term.provider";
import { userProvider } from "./providers/user.provider";
import { UserService } from "./services/user.service";

@Module({
    imports:[DatabaseModule],
    controllers:[UserController],
    providers:[UserService,...userProvider,...termProvider],
    exports:[UserService]
})
export class UserModule{

}