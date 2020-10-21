import { IsNotEmpty } from "class-validator";

export class CustomerTermDto{
    @IsNotEmpty()
    id:number;
    @IsNotEmpty()
    termId:number;
    @IsNotEmpty()
    customerId:number;

}