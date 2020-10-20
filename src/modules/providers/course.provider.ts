import { Course } from '../../models/course.entity';

export const courseProvider = [
    {
      provide: 'COURSES_REPOSITORY',
      useValue: Course,
    },
];