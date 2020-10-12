import { Model, Table, Column, DataType, HasOne, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript'
import { Tutor } from '../tutors/tutor.entity'

@Table
export class Course extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    courseName: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    maxNumberOfCustomers: number;

    @BelongsTo(() => Tutor)
    tutor: Tutor;

    @ForeignKey(() => Tutor)
    @Column
    tutorId: number;
}