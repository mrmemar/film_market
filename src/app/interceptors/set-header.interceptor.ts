import { HttpInterceptorFn } from '@angular/common/http';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
    const reqWithHeader = req.clone({
        headers: req.headers
            .set('accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTRjM2E5NjY1NzQwZjZlNjI3NmM3MmM0Nzc0NGJlZCIsInN1YiI6IjY1YzBmZWI2NWUxMjAwMDE0NTFjMWQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0ZKWPb4KVTBGGj0Yi0kIXxbrh3APDyxDnh7FnqVmSQM'),

    });

    return next(reqWithHeader)
};

