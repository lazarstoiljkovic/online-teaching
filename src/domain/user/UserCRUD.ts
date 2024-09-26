import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "./IUserRepository";
import { PaginationDto } from "./pagination.dto";
import { PeriodDto } from "./period.dto";
import { UserDto } from "./user.dto";

@Injectable()
export class UserCRUD{
    constructor(@Inject('UserRepo') private readonly userRepository:IUserRepository){

    }

    public async createUser(userDto:UserDto){
        return this.userRepository.createUser(userDto);
    }

    public async getUserById(id:number){
        return this.userRepository.findUserById(id);
    }

    public async getUserPaginated(paginationDto:PaginationDto){
        return this.userRepository.findAllPaginated(paginationDto);
    }

    public async updateUser(id:number,userDto:UserDto){
        return this.userRepository.updateUser(id,userDto);
    }

    public async deleteUser(id:number){
        return this.userRepository.deleteUser(id);
    }

    public async getUserByEmail(email:string){
        return this.userRepository.getUserByEmail(email);
    }

    public async getUserByUsername(username:string){
        return this.userRepository.getUserByUsername(username);
    }

    public async getTutorsCoursesForPeriod(tutorId:number,periodDto:PeriodDto){
        return this.userRepository.getTutorsCoursesInPeriod(tutorId,periodDto);
    }

}