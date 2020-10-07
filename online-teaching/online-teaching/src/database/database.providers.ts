import { ModulesContainer } from '@nestjs/core';
import {Sequelize} from 'sequelize-typescript'
import { Course } from 'src/courses/course.entity';
import { Customer } from 'src/customers/customer.entity';
import { CustomerTerm } from 'src/customer_terms/customer_term.entity';
import { Term } from 'src/terms/term.entity';
import { TutorDto } from 'src/tutors/dto/tutor.dto';
import { Tutor } from '../tutors/tutor.entity';

export const databaseProviders=[{
    provide: 'SEQUELIZE',
    useFactory: async () => {
        //hradcoded for test, should be change
        const sequelize=new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'lazarncoded',
            database: 'test',
        });
        sequelize.addModels([Tutor,Course,Customer,Term,CustomerTerm]);
        await sequelize.sync();
        return sequelize;
    },
},
];