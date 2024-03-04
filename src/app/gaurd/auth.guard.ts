import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authentiocation/auth.service';

export const authGuard: CanActivateFn = (router, state) => {
    const authService = inject(AuthService);
    const route = inject(Router);
    if (authService.isLogin()) {
        return true
    } else {
        route.navigate(["login"])
        return false
    }
};
