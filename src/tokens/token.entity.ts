import {Model,Table,Column,DataType, HasMany, ForeignKey} from 'sequelize-typescript';
import { Tutor } from 'src/tutors/tutor.entity';

@Table
export class Token extends Model{
    @Column(                                                                                                                                                                                                                                                                                                                                                                                                                                        {
        type:DataType.STRING(1234),
        primaryKey:true,
        allowNull:false
    })
    tokenValue:string;

    @ForeignKey(()=>Tutor)
    @Column
    tutorId:number;
}