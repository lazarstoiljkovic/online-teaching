import {Model,Table,Column,DataType, HasMany, BelongsToMany} from 'sequelize-typescript'
import { CustomerTerm } from 'src/customer_terms/customer_term.entity';
import { Term } from 'src/terms/term.entity';

@Table
export class Customer extends Model {

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
        type:DataType.BOOLEAN
    })
    validEmail:boolean;

    @BelongsToMany(()=>Term,()=>CustomerTerm)
    terms:Term[];
}