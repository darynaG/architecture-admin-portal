import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  getTask(): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/task`;

    return this.http.get<any>(url, {
      withCredentials: true
    });
  }

  cancelTask(id, model) {
    const url = ConfigService.getApiUrl() + `/v3/task/${id}`;

    return this.http.post<any>(url, model, {
      withCredentials: true
    });
  }

  completeTask(id, model) {
    const url = ConfigService.getApiUrl() + `/v3/task/${id}`;

    return this.http.post<any>(url, model, {
      withCredentials: true
    });
  }
}
