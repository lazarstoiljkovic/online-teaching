
import { Module } from '@nestjs/common';
import { CourseModule } from './course/CourseModule';
import { ServicesModule } from './services/services.module';
import { TermModule } from './term/TermModule';
import {WebhookModule} from './webhook/WebhookModule'
import { UserModule } from './user/UserModule';
import { WebhookLogModule } from './webhook_log/WebhookLogModule';

@Module({
	imports: [
		UserModule,CourseModule,TermModule,ServicesModule,WebhookModule,WebhookLogModule
	],
	exports: [
		UserModule,CourseModule,TermModule,ServicesModule,WebhookModule,WebhookLogModule
	],
})
export class DomainModule {}