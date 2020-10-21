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


export class UserService{
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository:typeof User,
        @Inject('TERMS_REPOSITORY') private readonly termsRepository:typeof Term,
        private readonly getUserPaginated: GetUserPaginated,
        private readonly getUserById:GetUserById
    ){

    }

    async getAllUsers():Promise<User[]>{
        return this.usersRepository.findAll();
    }

    async getAllTutors(paginationDto:PaginationDto):Promise<User[]>{
/*         const skippedItems=(paginationDto.page-1)*paginationDto.limit;
        const query:any={};
        query.limit=paginationDto.limit;
        query.offset=skippedItems;
        query.where={role:'tutor'};
        console.log(query); */

        return this.getUserPaginated.getUserPaginated(paginationDto);
        //return this.usersRepository.findAll(query);
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
        const user=await this.getUserById.getUserById(id);
        console.log(user);
        console.log('asdasdasdasd');
        return user;
    }

    async getTutorsCoursesInPeriod(tutorId:number,periodDto:PeriodDto){
        const startDate=new Date(periodDto.startDate);
        const endDate=new Date(periodDto.endDate);

        return this.termsRepository.findAll({
            where:{
                tutorId:tutorId,
                date:{
                    [Op.gt]:startDate,
                    [Op.lt]:endDate
                }
            }
        });


    }


}