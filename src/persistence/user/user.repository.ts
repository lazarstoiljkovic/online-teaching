import { Inject, Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { IUserRepository } from "src/domain/user/IUserRepository";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { PeriodDto } from "src/domain/user/period.dto";
import { UserDto } from "src/domain/user/user.dto";
import { ModelRepository } from "../model/model.repository";
import { User } from "./user.entity";

@Injectable()
export class UserRepository implements IUserRepository{
    userRepo=new ModelRepository(User);
    constructor(@Inject('USERS_REPOSITORY') private readonly user: typeof User){

    }

    public async deleteUser(id: number) {
        const filterOptions={id:id};
        return this.userRepo.delete(filterOptions);
    }
    
    public async updateUser(id: number,userDto:UserDto) {
        const model={...userDto};
        const filterOptions={id:id};
        return this.userRepo.update(model,filterOptions);
    }

    public async createUser(userDto:UserDto){
        return this.userRepo.create(userDto);
    }

    public async findAllPaginated(paginationDto:PaginationDto){
        return this.userRepo.get(paginationDto);
    }

    public async findUserById(id:number){
        const filterOptions={id:id};
        return this.userRepo.getOne(filterOptions);
    }

    public async getUserByEmail(email:string){
        const filterOptions={email:email};
        return this.userRepo.getOne(filterOptions);
    }

    public async getUserByUsername(username:string){
        const filterOptions={username:username};
        return this.userRepo.getOne(filterOptions);
    }

    public async getTutorsCoursesInPeriod(tutorId:number,periodDto:PeriodDto){
        const startDate=new Date(periodDto.startDate);
        const endDate=new Date(periodDto.endDate);

        const filterOptions={
            tutorId:tutorId,
            date:{
                [Op.gt]:startDate,
                [Op.lt]:endDate
            }
        };

        return this.userRepo.get(filterOptions);
    }
}