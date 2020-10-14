import { Inject } from "@nestjs/common";
import { Course } from "src/courses/course.entity";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";


export class UserService{
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository:typeof User
    ){

    }

    async getAllUsers():Promise<User[]>{
        return this.usersRepository.findAll();
    }

    async createUser(userDto:UserDto):Promise<User>{
        return this.usersRepository.create(userDto);
    }

    async updateUser(id:number,userDto:UserDto){
        return this.usersRepository.update({...userDto},{
            where:{id}
        });
    }

    async deleteUser(id:number){
        return this.usersRepository.destroy({
            where:{id}
        });
    }

    async getUserByEmail(email:string):Promise<User>{
        return this.usersRepository.findOne({
            where:{email:email}
        });
    }

    async getUserByUsername(username:string):Promise<User>{
        return this.usersRepository.findOne({
            where:{username:username}
        });
    }

    async findOneById(id:number):Promise<User>{
        return this.usersRepository.findOne<User>({
            where:{id:id}
        });
    }


}