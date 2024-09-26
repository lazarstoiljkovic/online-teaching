import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { userProvider } from "./user.provider";
import { UserRepoProvider } from "./UserPersistenceProvder";

@Module({
    imports:[DatabaseModule],
    providers:[UserRepoProvider,...userProvider],
    exports:[UserRepoProvider,...userProvider]
})
export class UserRepositoryModule{

}