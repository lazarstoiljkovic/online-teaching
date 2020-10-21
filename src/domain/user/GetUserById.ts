import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "./IUserRepository";
import { PaginationDto } from "./pagination.dto";

@Injectable()
export class GetUserById{
    constructor(@Inject('UserRepo') private readonly userRepository:IUserRepository){

    }

    public async getUserById(id:number){
        return this.userRepository.findUserById(id);
    }

}