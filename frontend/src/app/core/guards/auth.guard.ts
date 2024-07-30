import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(response => {
      const isActive = (response as any)?.active; // Safely access the `active` property
      if (isActive) {
        return true;
      } else {
        router.navigate(['/authentication'], { queryParams: { returnUrl: state.url } }); // Optionally, pass returnUrl
        return false;
      }
    }),
    catchError(err => {
      router.navigate(['/authentication']);
      return of(false);
    })
  );
};
