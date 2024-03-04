import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authentiocation/auth.service';

export const loginGuard: CanActivateFn = (router, state) => {
    const authService = inject(AuthService);
    const route = inject(Router);
    if (authService.isLogin()) {
        route.navigate(["panel"])
        return false
    } else {
        return true;
    }
};
