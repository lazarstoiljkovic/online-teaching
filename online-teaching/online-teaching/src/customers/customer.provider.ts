import { Customer } from './customer.entity';

export const tutorProvider = [
    {
      provide: 'CUSTOMERS_REPOSITORY',
      useValue: Customer,
    },
];