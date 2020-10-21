import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "./IUserRepository";
import { PaginationDto } from "./pagination.dto";
import { UserDto } from "./user.dto";

@Injectable()
export class CreateUser{
    constructor(@Inject('UserRepo') private readonly userRepository:IUserRepository){

    }

    public async createUser(userDto:UserDto){
        this.userRepository.createUser(userDto);
    }

}