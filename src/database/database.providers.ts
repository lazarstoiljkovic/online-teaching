import {Sequelize} from 'sequelize-typescript'
import { Course } from 'src/persistence/course/course.entity';
import { CustomerTerm } from 'src/persistence/customer_term/customer_term.entity';
import { Term } from 'src/persistence/term/term.entity';
import { User } from 'src/persistence/user/user.entity';
import { Webhook } from 'src/persistence/webhook/webhook.entity';
import { WebhookLog } from 'src/persistence/webhook_log/webhook_log.entity';


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
        sequelize.addModels([User,Course,Term,CustomerTerm,Webhook,WebhookLog]);
        await sequelize.sync();
        return sequelize;
    },
},
];