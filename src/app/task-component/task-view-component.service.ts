import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {Observable} from 'rxjs';
import {TaskElement} from './Task';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  getTask(id): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/sessions/${id}/task`;

   /* const task = {id: 123445454, requirements: [{id: 1, text: 'etet'}, {id: 2, text: 'etghfget'}, {id: 3, text: 'etefdg'}, {id: 4, text: 'etggrhfgdhd fg fget'}]};
    return of(task);*/
    return this.http.get<any>(url, {
      withCredentials: false
    });
  }

  cancelTask(sessionId, id, model) {
    const url = ConfigService.getApiUrl() + `/api/sessions/${sessionId}/task/${id}`;

    return this.http.post<TaskElement>(url, model, {
      withCredentials: false
    });
  }

  completeTask(sessionId, id, model) {
    const url = ConfigService.getApiUrl() + `/api/sessions/${sessionId}/task/${id}`;

    return this.http.post<TaskElement>(url, model, {
      withCredentials: false
    });
  }
}
