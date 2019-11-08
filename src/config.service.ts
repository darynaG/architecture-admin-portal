import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static apiUrl = '';

  public static getEnvironmentVariable(value) {
    return  this.apiUrl;
  }

  public static getApiUrl() {
    return this.getEnvironmentVariable('apiUrl');
  }
}
