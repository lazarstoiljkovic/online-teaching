import { Model, Table, Column, DataType, HasOne, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript'
import { User } from '../user/user.entity';

@Table
export class Course extends Model {

    static INCLUDES={
        tutor:User
    }

    

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    courseName: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue:0,
        allowNull: false
    })
    maxNumberOfCustomers: number;

    @BelongsTo(() => User,{onDelete:'cascade'})
    tutor: User;

    @ForeignKey(() => User)
    @Column
    tutorId: number;
}