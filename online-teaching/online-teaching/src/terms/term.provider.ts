import { Term } from './term.entity';

export const termProvider = [
    {
      provide: 'TERMS_REPOSITORY',
      useValue: Term,
    },
];