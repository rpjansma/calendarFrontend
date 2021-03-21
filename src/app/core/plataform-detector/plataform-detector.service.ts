import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlatformDetector {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
