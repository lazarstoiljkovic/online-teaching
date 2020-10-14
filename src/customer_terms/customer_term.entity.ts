import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Term } from 'src/terms/term.entity';
import { User } from 'src/users/user.entity';
import {Customer} from '../customers/customer.entity'

@Table
export class CustomerTerm extends Model{
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    })
    id:number;

    @BelongsTo(()=>User,{onDelete:'cascade'})
    user:User;

    @ForeignKey(()=>User)
    @Column
    customerId:number;

    @BelongsTo(()=>Term,{onDelete:'cascade'})
    term:Term;

    @ForeignKey(()=>Term)
    @Column
    termId:number;

}