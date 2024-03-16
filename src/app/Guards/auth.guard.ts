import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../Authentication/Services/jwt.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (jwtService.isLoggedIn() && jwtService.decodeToken()?.roles?.includes("ADMIN")) {
    return true;
  }

  return router.navigate(['/account/login'], { state: { returnUrl: state.url } });
};
