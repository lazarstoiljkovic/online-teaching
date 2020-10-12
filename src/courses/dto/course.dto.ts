export class CourseDto{
    courseId:string;
    courseName:string;
    maxNumberOfCustomers:number;
    tutorId:number;

    //added aditional propertise if necesery

    constructor(courseId:string,courseName:string,maxNumberOfCustomers:number,tutorId:number){
        this.courseId=courseId;
        this.courseName=courseName;
        this.maxNumberOfCustomers=maxNumberOfCustomers;
        this.tutorId=tutorId;
    }
}