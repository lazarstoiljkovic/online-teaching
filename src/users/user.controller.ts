import { Controller, Get, NotFoundException, Param, UseGuards,Body,Put,Delete, Query } from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { PaginationDto } from "src/auth/dto/pagination.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private readonly userService:UserService){

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(){
        return this.userService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/tutors')
    async findAllTutors(@Query() paginationDto:PaginationDto){
        paginationDto.page=Number(paginationDto.page);;
        paginationDto.limit=Number(paginationDto.limit);

        return this.userService.getAllTutors(paginationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Param('id') id:number){
        const user=await this.userService.findOneById(id);

        if(!user){
            throw new NotFoundException('This user doesnt exist');
        }

        return user;
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updateUser(@Param('id')id:number,@Body() userDto:UserDto) {
        console.log('asdadsadsad');
            const updateUser=await this.userService.updateUser(id,userDto)
            if(updateUser[0]===0){
                throw new NotFoundException('Cant find this user to update');
            }

            return updateUser;

    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteUser(
        @Param('id') id:number
    ){
        const deleted=await this.userService.deleteUser(id);

        if(deleted===0){
            throw new NotFoundException('Cant find this user to delete');
        }

        return 'Successfully deleted';
    }

}