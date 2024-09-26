import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { termProvider } from "./term.provider";
import { TermRepoProvider } from "./TermPersistenceProvider";

@Module({
    imports:[DatabaseModule],
    providers:[TermRepoProvider,...termProvider],
    exports:[TermRepoProvider,...termProvider]
})
export class TermRepositoryModule{

}