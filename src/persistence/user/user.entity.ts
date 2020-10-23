import {Model,Table,Column,DataType, HasMany, BelongsToMany} from 'sequelize-typescript'
import {FindOptions,FindAttributeOptions} from 'sequelize'
import { Course } from '../course/course.entity';
import { CustomerTerm } from '../customer_term/customer_term.entity';
import { Term } from '../term/term.entity';
import { PaginationDto } from 'src/domain/user/pagination.dto';

export enum UserRole{
    ADMIN='admin',
    TUTOR='tutor',
    CUSTOMER='customer'
}





class BuffedModel extends Model{
    static INCLUDES={
        customerTerms:Term,
        courses:Course
    }
    static DEFAULT_EXCLUDES = [];
    static DEFAULT_INCLUDES = null;

    static getAttributes():FindAttributeOptions{
        const attributes:FindAttributeOptions={
            exclude:this.DEFAULT_EXCLUDES
        };
        if(this.DEFAULT_INCLUDES && this.DEFAULT_INCLUDES.length){
            attributes.include=this.DEFAULT_INCLUDES
        }
        return attributes;
    }
}

@Table
export class User extends BuffedModel {
    public static INCLUDES={
        customerTerms:Term,
        courses:Course
    }

    static DEFAULT_EXCLUDES=['password','firstName','lastName','username']

    static getHello(){
        console.log('Hello world');
    }
    
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
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    validEmail:boolean;

    @Column({
        type:DataType.STRING(1024),
        defaultValue:'undefined',
    })
    profileDetails:string;

    @HasMany(()=>Term)
    terms:Term[];

    @HasMany(()=>Course)
    courses: Course[];

    @BelongsToMany(()=>Term,()=>CustomerTerm)
    customerTerms:Term[];

}

/* const userRepo=new ModelRepository(User);
const user=new User(); */