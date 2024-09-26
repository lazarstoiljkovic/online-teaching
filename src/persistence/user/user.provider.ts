import { User } from "./user.entity";


export const userProvider=[
    {
        provide:'USERS_REPOSITORY',
        useValue:User,
    },
]