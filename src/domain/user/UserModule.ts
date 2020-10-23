import { Module } from '@nestjs/common';
import { GetUserPaginated } from './GetUsersPaginated';
import { UserRepositoryModule } from '../../persistence/user/user_repository.module';
import { CreateUser } from './CreateUser';
import { GetUserById } from './GetUserById';
import { UserCRUD } from './UserCRUD';

@Module({
	imports: [
		UserRepositoryModule,
	],
	providers: [GetUserPaginated,CreateUser,GetUserById,UserCRUD],
	exports: [GetUserPaginated,CreateUser,GetUserById,UserCRUD],
})
export class UserModule {}