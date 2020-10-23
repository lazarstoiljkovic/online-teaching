import { PaginationDto } from "./pagination.dto";
import { PeriodDto } from "./period.dto";
import { UserDto } from "./user.dto";

export interface IUserRepository{
    findAllPaginated(paginationDto:PaginationDto);
    findUserById(id:number);
    updateUser(id:number,userDto:UserDto);
    createUser(userDto:UserDto);
    deleteUser(id:number);
    getUserByEmail(email:string);
    getUserByUsername(username:string);
    getTutorsCoursesInPeriod(tutorId:number,periodDto:PeriodDto);
}