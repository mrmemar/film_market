import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/authentiocation/auth.service';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    req = req.clone({ headers: req.headers.set("Authorization", `Bearer ${authService.token}`) })
    return next(req)
};

