import { Module } from '@nestjs/common';
import { GetUserPaginated } from './GetUsersPaginated';
import { UserRepositoryModule } from '../../persistence/user/user_repository.module';
import { CreateUser } from './CreateUser';
import { GetUserById } from './GetUserById';

@Module({
	imports: [
		UserRepositoryModule,
	],
	providers: [GetUserPaginated,CreateUser,GetUserById],
	exports: [GetUserPaginated,CreateUser,GetUserById],
})
export class UserModule {}