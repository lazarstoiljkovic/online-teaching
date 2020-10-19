import { Inject, Injectable } from "@nestjs/common";
import { response } from "express";
import { Course } from "src/models/course.entity";
import { PaginationResponseDto } from "src/models/dtos/paginatio-response.dto";
import { PaginationDto } from "src/models/dtos/pagination.dto";
import { User } from "src/models/user.entity";

@Injectable()
export class PaginationService{

    constructor(@Inject('COURSES_REPOSITORY') private readonly courseRepository: typeof Course){

    }


    async getAllCoursesByPage(paginationDto:PaginationDto):Promise<PaginationResponseDto>{
        const skippedItems=(paginationDto.page-1)*paginationDto.limit;
        const result:any=await this.courseRepository.findAndCountAll({
            limit:paginationDto.limit,
            offset:skippedItems,
            include:[{
                model:User,
                attributes:{
                    exclude:['password']
                }
            }]
        });
        //console.log(result);
        //console.log(result.rows);
        //console.log(result.count);
        const totalPages=parseInt((result.count/paginationDto.limit).toString())+1;
        console.log(totalPages);
        const paginationResponse:PaginationResponseDto={
            current_page:paginationDto.page,
            records:{...result.rows},
            page_size:paginationDto.limit,
            total_pages:totalPages
        }
        console.log(paginationResponse);

        return paginationResponse;
    }
}                                                                                       