import { Model, Table, Column, DataType, HasMany, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript'
import { Course } from '../course/course.entity';
import { CustomerTerm } from '../customer_term/customer_term.entity';
import { User } from '../user/user.entity';

@Table
export class Term extends Model {

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    date: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    startTime: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    endTime: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue:0
    })
    currentCustomersOnCourse: number;

    @BelongsTo(() => Course,{onDelete:'cascade'})
    courseTerm: Course;

    @ForeignKey(() => Course)
    courseId: number;

    @BelongsTo(()=>User,{onDelete:'cascade'})
    tutor:User;

    @ForeignKey(()=>User)
    tutorId:number;

    @BelongsToMany(() => User, () => CustomerTerm)
    customers: User[];
}