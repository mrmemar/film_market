import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideToastr } from 'ngx-toastr';
import { setQueryParamsInterceptor } from './interceptors/set-query-params.interceptor';
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(),
        provideToastr({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            progressBar: true,
        }),
        provideHttpClient(
            withInterceptors([setQueryParamsInterceptor])
        )
    ]
};
