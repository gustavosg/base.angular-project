import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppRoutingModule, routes } from './app-routing.module';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppModule } from './app.module';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { RefreshTokenInterceptor, loadingInterceptor as LoadingInterceptor } from './interceptors';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {


    providers:
        [
            provideRouter(routes),
            provideClientHydration(),
            provideAnimations(),
            provideHttpClient(withFetch()),
            provideHttpClient(withInterceptors([
              LoadingInterceptor,
              RefreshTokenInterceptor
            ])),
            importProvidersFrom(HttpClientModule),
            AppModule,
            provideToastr({
                progressBar: true,
                positionClass: 'toast-bottom-right',
                timeOut: 10000,
                tapToDismiss: true,
                closeButton: true,
                countDuplicates: true,
                maxOpened: 4
            })

        ]
};
