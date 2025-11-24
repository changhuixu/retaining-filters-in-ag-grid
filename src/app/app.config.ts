import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { routes } from './app.routes';

ModuleRegistry.registerModules([AllCommunityModule]);

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
