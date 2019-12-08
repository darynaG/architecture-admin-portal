import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static apiUrl = 'http://localhost:5000';

  public static getEnvironmentVariable(value) {
    return  this.apiUrl;
  }

  public static getApiUrl() {
    return this.getEnvironmentVariable('apiUrl');
  }
}

