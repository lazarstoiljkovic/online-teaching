import { CustomerTerm } from './customer_term.entity';

export const customerTermsProvider = [
    {
      provide: 'CUSTOMERTERMS_REPOSITORY',
      useValue: CustomerTerm,
    },
];