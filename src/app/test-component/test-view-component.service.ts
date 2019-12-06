import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from '../../config.service';
import {Session, SpecificationDetailsCollection} from '../task-component/Task';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) { }

  getSpecifications(accountId, specificationId): Observable<SpecificationDetailsCollection> {
    const url = ConfigService.getApiUrl() + `/api/specifications/${specificationId}/account/${accountId}`;
    return this.http.get<any>(url,  {
      withCredentials: false
    });
  }

  createSession(specificationId, accountId): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/session/specifications/${specificationId}/account/${accountId}`;
    return this.http.put<Session>(url, {
      withCredentials: false
    });
  }

  getBestScore(accountId, specificationId): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/accounts/${accountId}/bestscore/${specificationId}`;
    return this.http.get<any>(url,  {
      withCredentials: false
    });
  }



}
