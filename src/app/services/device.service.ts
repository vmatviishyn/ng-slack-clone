import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  isIOS(): boolean {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
  }

  isAndroid(): boolean {
    return [
      'android Simulator',
      'android',
    ].includes(navigator.platform)
    || (navigator.userAgent.includes('Android') && 'ontouchend' in document);
  }

  isMobile(): boolean {
    return this.isIOS() || this.isAndroid();
  }

  isMobilePwa(): boolean {
    return this.isMobile() && window.matchMedia('(display-mode: standalone)').matches;
  }
}
