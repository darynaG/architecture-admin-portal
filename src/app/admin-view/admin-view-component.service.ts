import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {Observable} from 'rxjs';
import {Specification, SpecificationCollection} from './Specification';


@Injectable({
  providedIn: 'root'
})
export class AdminViewService {
  constructor(private http: HttpClient) { }

  getAllSpecifications(): SpecificationCollection {
    const url = ConfigService.getApiUrl() + `/v3/characteristics`;

   /* return this.http.get<SpecificationCollection>(url, {
      withCredentials: true
    });*/
    const c = new SpecificationCollection();
    c.content  = [{name : 'fisrd', id: 12, description: 'fs'}, {name : 'fisrfgdgfrdgd', id: 14, description: 'fs'} ];
    return c;
  }

  deleteSpecification(id: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/characteristics/${id}`;

    return this.http.delete<any>(url, {
      withCredentials: true
    });
  }

  updateSpecification(id: number, model: any) {
    const url = ConfigService.getApiUrl() + `/v3/characteristics/${id}`;

    return this.http.post<any>(url, model, {
      withCredentials: true
    });
  }

  createSpecification(model): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/characteristics`;

    return this.http.put<any>(url, model, {
      withCredentials: true
    });
  }
}
