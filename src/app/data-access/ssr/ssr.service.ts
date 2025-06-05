import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SsrService {
  platformId = inject(PLATFORM_ID);

  isSSR(): boolean {
    return isPlatformServer(this.platformId);
  }
}
