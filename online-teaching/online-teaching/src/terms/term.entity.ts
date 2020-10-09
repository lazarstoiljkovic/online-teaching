import {Model,Table,Column,DataType, HasMany, BelongsTo, ForeignKey,BelongsToMany} from 'sequelize-typescript'
import { Course } from 'src/courses/course.entity';
import { Customer } from 'src/customers/customer.entity';
import { CustomerTerm } from 'src/customer_terms/customer_term.entity';

@Table
export class Term extends Model{

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    date:Date;

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    startTime:Date;

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    endTime:Date;

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    currentCustomersOnCourse:number;

    @BelongsTo(()=>Course)
    courseTerm:Course;

    @ForeignKey(()=>Course)
    courseId:number;

    @BelongsToMany(()=>Customer,()=>CustomerTerm)
    customers:Customer[];
}