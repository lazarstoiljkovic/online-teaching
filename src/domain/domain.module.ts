
import { Module } from '@nestjs/common';
import { CourseModule } from './course/CourseModule';

import { UserModule } from './user/UserModule';

@Module({
	imports: [
		UserModule,CourseModule
	],
	exports: [
		UserModule,CourseModule
	],
})
export class DomainModule {}