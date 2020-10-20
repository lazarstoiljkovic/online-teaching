import { ModulesContainer } from '@nestjs/core';
import {Sequelize} from 'sequelize-typescript'
import { Course } from 'src/models/course.entity';
import { CustomerTerm } from 'src/models/customer_term.entity';
import { Term } from 'src/models/term.entity';
import { User } from 'src/models/user.entity';


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
        sequelize.addModels([User,Course,Term,CustomerTerm]);
        await sequelize.sync();
        return sequelize;
    },
},
];