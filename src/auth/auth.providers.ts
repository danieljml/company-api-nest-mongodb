import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

export const authProviders = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];
