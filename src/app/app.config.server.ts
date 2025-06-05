import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { SsrService } from './data-access/ssr/ssr.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    SsrService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
