import {Model,Table,Column,DataType,HasOne, ForeignKey, PrimaryKey} from 'sequelize-typescript'
import {Tutor} from '../tutors/tutor.entity'

@Table
export class Course extends Model {
    @Column({
        type: DataType.STRING,
        allowNull:false,
        unique:true
    })
    courseId:string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    courseName:string;

    @Column({
        type: DataType.INTEGER,
        allowNull:false,
    })
    maxNumberOfCustomers:number;


    @ForeignKey(()=>Tutor)
    @Column
    tutorId: number;


}