import { PaginationDto } from "./pagination.dto";
import { UserDto } from "./user.dto";

export interface IUserRepository{
    findAllPaginated(paginationDto:PaginationDto);
    findUserById(id:number);
    updateUser(id:number);
    createUser(userDto:UserDto);
}