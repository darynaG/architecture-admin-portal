import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {Observable} from 'rxjs';
import {TaskEl, TaskElement} from './Task';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  getTask(id): Observable<TaskEl> {
    const url = ConfigService.getApiUrl() + `/api/session/${id}/task`;

    return this.http.get<TaskEl>(url, {
      withCredentials: false
    });
  }

  cancelTask(sessionId, id, model) {
    const url = ConfigService.getApiUrl() + `/api/session/${sessionId}/cancel`;
    return this.http.post<TaskElement>(url, model, {
      withCredentials: false
    });
  }

  completeTask(sessionId, model) {
    const url = ConfigService.getApiUrl() + `/api/session/${sessionId}`;

    return this.http.post<any>(url, model, {
      withCredentials: false
    });
  }
}
