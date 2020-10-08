import { Token } from './token.entity';

export const tokenProvider = [
    {
      provide: 'TOKENS_REPOSITORY',
      useValue: Token,
    },
];