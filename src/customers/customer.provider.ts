import { Customer } from './customer.entity';

export const customerProvider = [
    {
      provide: 'CUSTOMERS_REPOSITORY',
      useValue: Customer,
    },
];