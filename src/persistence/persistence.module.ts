import { Module } from "@nestjs/common";
import { CourseRepositoryModule } from "./course/course_repository.module";
import { TermRepositoryModule } from "./term/term_repository.module";
import { UserRepositoryModule } from "./user/user_repository.module";
import { WebhookRepositoryModule } from "./webhook/webhook_repository.module";
import { WebhookLogRepositoryModule } from "./webhook_log/webhook_log_repository.module";

@Module({
    imports:[UserRepositoryModule,CourseRepositoryModule,TermRepositoryModule,WebhookRepositoryModule,WebhookLogRepositoryModule],
    exports:[UserRepositoryModule,CourseRepositoryModule,TermRepositoryModule,WebhookRepositoryModule,WebhookLogRepositoryModule]
})
export class PersistenceModule{

}