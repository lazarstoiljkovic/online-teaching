export class TutorDto{
    firstName:string;
    lastName:string;
    email:string;
    username:string;
    password:string;
    //additional properties if necessary

    constructor(firstName:string,lastName:string,email:string,username:string,password:string){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.username=username;
        this.password=password;
    }
    
}