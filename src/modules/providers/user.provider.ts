import { User } from "../../models/user.entity";


export const userProvider=[
    {
        provide:'USERS_REPOSITORY',
        useValue:User,
    },
]