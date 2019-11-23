import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {Observable} from 'rxjs';
import { SpecificationCollection} from './Specification';
import {RequirementCollection} from './Requirement';


@Injectable({
  providedIn: 'root'
})
export class AdminViewService {
  constructor(private http: HttpClient) { }

  getAllSpecifications(): Observable<SpecificationCollection> {
    const url = ConfigService.getApiUrl() + `/api/specifications`;

    return this.http.get<SpecificationCollection>(url, {
    });
  }

  deleteSpecification(id: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/specification/${id}`;

    return this.http.delete<any>(url, {
      withCredentials: false
    });
  }

  updateSpecification(id: number, model: any) {
    const url = ConfigService.getApiUrl() + `/api/specification/update/${id}`;

    return this.http.post<any>(url, model, {
      withCredentials: false
    });
  }

  createSpecification(model): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/specifications`;
    return this.http.put<any>(url, model, {
      withCredentials: false
    });
  }

  // requirement
  getAllRequirementsBySpecification(specificationId: number): Observable<RequirementCollection> {
    const url = ConfigService.getApiUrl() + `/api/specification/${specificationId}/requirements`;
    return this.http.get<RequirementCollection>(url, {
      withCredentials: false
    });
  }

  deleteRequirement(specificationId: number, id: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/specification/${specificationId}/requirement/${id}`;

    return this.http.delete<any>(url, {
      withCredentials: false
    });
  }

  updateRequirement(specificationId: number, id: number, model: any) {
    const url = ConfigService.getApiUrl() + `/api/specification/${specificationId}/requirement/${id}`;

    return this.http.post<any>(url, model, {
      withCredentials: false
    });
  }

  createRequirement(specificationId: number, model): Observable<any> {
    const url = ConfigService.getApiUrl() + `/api/specification/${specificationId}/requirement`;
    console.log(model)
    return this.http.put<any>(url, model, {
      withCredentials: false
    });
  }
}
