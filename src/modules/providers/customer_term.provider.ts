import { CustomerTerm } from '../../models/customer_term.entity';

export const customerTermsProvider = [
    {
      provide: 'CUSTOMERTERMS_REPOSITORY',
      useValue: CustomerTerm,
    },
];