import {Model,Table,Column,DataType, HasMany} from 'sequelize-typescript'
import { Course } from 'src/courses/course.entity';
import { Token } from 'src/tokens/token.entity';

@Table
export class Tutor extends Model {
    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    firstName:string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    lastName:string;

    @Column({
        type: DataType.STRING,
        unique:true,
        allowNull:false,
    })
    username:string;

    @Column({
        type: DataType.STRING,
        unique:true,
        allowNull:false,
    })
    email:string;


    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    password:string;

    @HasMany(()=>Course)
    courses: Course[];

    @HasMany(()=>Token)
    tokens: Token[];
}