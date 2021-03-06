import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ConfigService} from '../../config.service';
import {SpecificationDetailsCollection, TestResult} from '../task-component/Task';


@Injectable({
  providedIn: 'root'
})
export class ResultService {
  constructor(private http: HttpClient) { }

  getSpecifications(accountId, specificationId): Observable<SpecificationDetailsCollection> {
    const url = ConfigService.getApiUrl() + `/api/specifications/${specificationId}/account/${accountId}`;
    return this.http.get<any>(url,  {
      withCredentials: false
    });
  }

  getTestResults( sessionId): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/session/${sessionId}/result`;
    return this.http.get<any>(url,  {
      withCredentials: false
    });
  }

  getSpecificationDetailsForSession(sessionId): Observable<SpecificationDetailsCollection> {
    const url = ConfigService.getApiUrl() + `/api/session/${sessionId}/specification`;
    return this.http.get<any>(url,  {
      withCredentials: false
    });
  }
}
