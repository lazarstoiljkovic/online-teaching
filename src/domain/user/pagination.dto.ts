import { IsPositive } from "class-validator"
import { Max } from "sequelize-typescript"

export class PaginationDto {

  page: number
  
  limit: number

}