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

class FindOption implements FindOptions{
    limit:number;
    skip:number;
    
    paginate(paginationData:PaginationDto){
        const skippedItems=(paginationData.page-1)*paginationData.limit;
        this.limit=paginationData.limit;
        this.skip=skippedItems;
        return this; 
    }

    filter(filterData){
        return this;
    }

    sort(sortData){
        return this;
    }
}

class ModelRepository<T extends typeof BuffedModel & { new (): void}> {
    model:T;
    constructor(model:T){
        this.model=model;
    }

    get(paginateOptions,filterOptions,sortOptions,relationOptions){
        const query=new FindOption();
        this.paginateQuery(query,paginateOptions);
        this.filterQuery(query,filterOptions)
        this.sortQuery(query,sortOptions)
        this.relationsQuery(query,relationOptions)
        return this.model.findAndCountAll(query)
    }

    paginateQuery(query,paginationDto){
        const skippedItems=(paginationDto.page-1)*paginationDto.limit;
        query.limit=paginationDto.limit;
        query.skip=skippedItems;
    }

    filterQuery(query,filterOptions){
        query.where=filterOptions;
        return;
    }

    sortQuery(query,sortOptions){
        return;
    }

    relationsQuery(query,relationOptions){
        const {relationPaths=[]} =relationOptions
        const modelIncludes=this.model.INCLUDES;
        const relations=[];
        relationPaths.forEach(modelName=>{
            const relationModel=modelIncludes[modelName]
            if(relationModel){
                relations.push({
                    model:relationModel,
                    attributes:relationModel.getAttributes()
                })
            }
        })
        query.includes=relations;
    }
}


type UserType= { 
    name?: string;
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
export class User extends Model {
    static INCLUDES={
        customerTerms:Term,
        courses:Course
    }
    static DEFAULT_EXCLUDES=['password']
    static FILLABLE=['firstName','lastName','username']

    
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