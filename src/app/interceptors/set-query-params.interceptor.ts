import { HttpInterceptorFn } from '@angular/common/http';

export const setQueryParamsInterceptor: HttpInterceptorFn = (req, next) => {
    if (!req.url.includes('auth')) {
        req = req.clone({
            params: req.params.set('api_key', '2dd076ac4f075aaffe7234b8153f05ec')
        });
    }
    return next(req)
};
