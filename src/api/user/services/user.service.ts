import { Inject } from "@nestjs/common";
import { PaginationDto } from "src/domain/user/pagination.dto";
import { Course } from "src/persistence/course/course.entity";
import { UserDto } from "../../../domain/user/user.dto";
import { User } from "../../../persistence/user/user.entity";
import { PeriodDto } from "src/domain/user/period.dto";
import { Term } from "src/persistence/term/term.entity";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { GetUserPaginated } from "src/domain/user/GetUsersPaginated";
import { GetUserById } from "src/domain/user/GetUserById";
import { UserCRUD } from "src/domain/user/UserCRUD";


export class UserService{
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository:typeof User,
        @Inject('TERMS_REPOSITORY') private readonly termsRepository:typeof Term,
        private readonly userCRUD: UserCRUD,
        private readonly getUserPaginated: GetUserPaginated,
        private readonly getUserById:GetUserById
    ){

    }

    async getAllUsers():Promise<User[]>{
        return this.usersRepository.findAll();
    }

    async getAllTutors(paginationDto:PaginationDto):Promise<User[]>{
        return this.userCRUD.getUserPaginated(paginationDto);
        
    }

    async createUser(userDto:UserDto):Promise<User>{
        return this.userCRUD.createUser(userDto);
    }

    async updateUser(id:number,userDto:UserDto){
        return this.userCRUD.updateUser(id,userDto);
    }

    async deleteUser(id:number){
        return this.userCRUD.deleteUser(id);
    }

    async getUserByEmail(email:string):Promise<User>{
        return this.userCRUD.getUserByEmail(email);
    }

    async getUserByUsername(username:string):Promise<User>{
        return this.userCRUD.getUserByUsername(username);
    }

    async findOneById(id:number):Promise<User>{
        return this.userCRUD.getUserById(id);
    }

    async getTutorsCoursesInPeriod(tutorId:number,periodDto:PeriodDto){
        return this.userCRUD.getTutorsCoursesForPeriod(tutorId,periodDto);
    }


}