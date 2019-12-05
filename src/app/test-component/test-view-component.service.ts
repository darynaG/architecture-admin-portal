import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from '../../config.service';
import {Session} from '../task-component/Task';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) { }

  getSpecifications(id) {

  }
  createSession(model): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/sessions`;
    return this.http.put<Session>(url, model, {
      withCredentials: false
    });
  }

}
