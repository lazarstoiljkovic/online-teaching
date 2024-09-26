import { Module } from "@nestjs/common";
import { TermRepositoryModule } from "src/persistence/term/term_repository.module";
import { TermCRUD } from "./TermCRUD";

@Module({
    imports:[TermRepositoryModule],
    providers:[TermCRUD],
    exports:[TermCRUD]
})
export class TermModule{

}