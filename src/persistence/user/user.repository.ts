import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/user/IUserRepository";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { UserDto } from "src/domain/user/user.dto";
import { ModelRepository } from "../model/model.repository";
import { User } from "./user.entity";

@Injectable()
export class UserRepository implements IUserRepository{
    userRepo=new ModelRepository(User);
    constructor(@Inject('USERS_REPOSITORY') private readonly user: typeof User){

    }
    updateUser(id: number) {
        throw new Error("Method not implemented.");
    }

    public async createUser(userDto:UserDto){
        return this.userRepo.create(userDto);
    }

    public async findAllPaginated(paginationDto:PaginationDto){
        console.log(1234);
        return this.userRepo.get(paginationDto);
    }

    public async findUserById(id:number){
        const filterOptions={id:id};
        console.log(filterOptions);
        console.log(5555555);
        this.userRepo.getOne(filterOptions);
    }
}