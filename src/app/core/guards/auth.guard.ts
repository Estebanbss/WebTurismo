import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = Inject(AuthService);

  return true;
};

