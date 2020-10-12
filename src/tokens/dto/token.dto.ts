export class TokenDto{
    tokenValue:string;
    tutorId:number;

    constructor(tokenValue:string,tutorId:number){
        this.tokenValue=tokenValue;
        this.tutorId=tutorId;
    }
}