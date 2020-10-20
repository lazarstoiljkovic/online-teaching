import { Term } from '../../models/term.entity';

export const termProvider = [
    {
      provide: 'TERMS_REPOSITORY',
      useValue: Term,
    },
];