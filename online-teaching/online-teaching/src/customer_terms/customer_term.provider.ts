import { CustomerTerm } from './customer_term.entity';

export const courseProvider = [
    {
      provide: 'CUSTOMERTERMS_REPOSITORY',
      useValue: CustomerTerm,
    },
];