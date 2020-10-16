import { Inject } from "@nestjs/common";
import { PaginationDto } from "src/models/dtos/pagination.dto";
import { Course } from "src/models/course.entity";
import { UserDto } from "../../models/dtos/user.dto";
import { User } from "../../models/user.entity";
import { PeriodDto } from "src/models/dtos/period.dto";
import { Term } from "src/models/term.entity";
import { Op } from "sequelize";
import sequelize from "sequelize";


export class UserService{
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository:typeof User,
        @Inject('TERMS_REPOSITORY') private readonly termsRepository:typeof Term
    ){

    }

    async getAllUsers():Promise<User[]>{
        return this.usersRepository.findAll();
    }

    async getAllTutors(paginationDto:PaginationDto):Promise<User[]>{
        const skippedItems=(paginationDto.page-1)*paginationDto.limit;

        return this.usersRepository.findAll({
            limit:paginationDto.limit,
            offset:skippedItems,
            where:{
                role:'tutor'
            }
        })
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

    async getTutorsCoursesInPeriod(tutorId:number,periodDto:PeriodDto){
        let startDate=new Date(periodDto.startDate);
        let endDate=new Date(periodDto.endDate);

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