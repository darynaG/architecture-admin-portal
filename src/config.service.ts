import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public static getEnvironmentVariable(value) {
    let environment: string;
    let data = {};

    environment = window.location.hostname;

    switch (environment) {
      case 'admin-portal.lite.doublehorn.com':
        data = {
          apiUrl: 'https://api.doublehorn.com/product-catalog'
        };
        break;

      case 'admin-portal.lite-staging.doublehorn.com':
        data = {
          apiUrl: 'https://staging.api.doublehorn.com/product-catalog'
        };
        break;

      default:
        data = {
          apiUrl: 'https://staging.api.doublehorn.com/product-catalog'
        };
    }

    return data[value];
  }

  public static getApiUrl() {
    return this.getEnvironmentVariable('apiUrl');
  }

}
