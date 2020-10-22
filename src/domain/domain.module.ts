
import { Module } from '@nestjs/common';
import { CourseModule } from './course/CourseModule';
import { TermModule } from './term/TermModule';

import { UserModule } from './user/UserModule';

@Module({
	imports: [
		UserModule,CourseModule,TermModule
	],
	exports: [
		UserModule,CourseModule,TermModule
	],
})
export class DomainModule {}