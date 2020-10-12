import { Tutor } from "./tutor.entity";

export const tutorProvider = [
    {
      provide: 'TUTORS_REPOSITORY',
      useValue: Tutor,
    },
];