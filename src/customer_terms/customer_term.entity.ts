import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Term } from 'src/terms/term.entity';
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


    @ForeignKey(()=>Customer)
    @Column
    customerId:number;


    @ForeignKey(()=>Term)
    @Column
    termId:number;

}