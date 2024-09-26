import { Module } from '@nestjs/common';
import { CourseModule } from './course/CourseModule';
import { ServicesModule } from './services/services.module';
import { TermModule } from './term/TermModule';
import {WebhookModule} from './webhook/WebhookModule'
import { UserModule } from './user/UserModule';
import { WebhookLogModule } from './webhook_log/WebhookLogModule';
import { WebhookService } from './services/webhook.service';
import { PersistenceModule } from 'src/persistence/persistence.module';
import { HttpModule } from '@nestjs/common';

@Module({
	imports: [
		HttpModule,UserModule,CourseModule,TermModule,ServicesModule,WebhookModule,WebhookLogModule,PersistenceModule
	],
	providers:[WebhookService],
	exports: [
		UserModule,CourseModule,TermModule,ServicesModule,WebhookModule,WebhookLogModule,WebhookService
	],
})
export class DomainModule {}