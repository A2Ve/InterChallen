import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    //checks if logged in
    if (authService.isLoggedIn()) {
        return true;
    }

    //if not logged in, goes back to login page
    router.navigate(['/login']);;
    return false; // wont be able to access
}