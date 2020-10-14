import {Model,Table,Column,DataType, HasMany, BelongsToMany} from 'sequelize-typescript'
import { Course } from 'src/courses/course.entity';
import { CustomerTerm } from 'src/customer_terms/customer_term.entity';
import { Term } from 'src/terms/term.entity';
import { Token } from 'src/tokens/token.entity';

export enum UserRole{
    ADMIN='admin',
    TUTOR='tutor',
    CUSTOMER='customer'
}

@Table
export class User extends Model {
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

    @Column({
        type:DataType.STRING,
        allowNull:false,
        defaultValue:UserRole.TUTOR
    })
    role:UserRole;

    @Column({
        type:DataType.STRING(1024),
        defaultValue:'undefined'
    })
    profileDetails:string;

    @HasMany(()=>Term)
    terms:Term[];

    @HasMany(()=>Course)
    courses: Course[];

    @BelongsToMany(()=>Term,()=>CustomerTerm)
    customerTerms:Term[];

}