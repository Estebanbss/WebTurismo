import { CanActivateFn } from '@angular/router';

export const prestadorGuard: CanActivateFn = (route, state) => {
  return true;
};
