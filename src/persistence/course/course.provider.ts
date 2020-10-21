import { Course } from './course.entity';

export const courseProvider = [
    {
      provide: 'COURSES_REPOSITORY',
      useValue: Course,
    },
];