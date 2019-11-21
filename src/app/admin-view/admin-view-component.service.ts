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
    const url = ConfigService.getApiUrl() + `/v3/specification`;

    return this.http.get<SpecificationCollection>(url, {
      withCredentials: true
    });
  }

  deleteSpecification(id: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/specification/${id}`;

    return this.http.delete<any>(url, {
      withCredentials: true
    });
  }

  updateSpecification(id: number, model: any) {
    const url = ConfigService.getApiUrl() + `/v3/specification/${id}`;

    return this.http.post<any>(url, model, {
      withCredentials: true
    });
  }

  createSpecification(model): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/specification`;

    return this.http.put<any>(url, model, {
      withCredentials: true
    });
  }

  // requirement

  getAllRequirements(): Observable<RequirementCollection> {
    const url = ConfigService.getApiUrl() + `/v3/requirement`;

    return this.http.get<RequirementCollection>(url, {
       withCredentials: true
     });
  }

  deleteRequirement(specificationId: number, id: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/specification/${specificationId}/requirement/${id}`;

    return this.http.delete<any>(url, {
      withCredentials: true
    });
  }

  updateRequirement(specificationId: number, id: number, model: any) {
    const url = ConfigService.getApiUrl() + `/v3/specification/${specificationId}/requirement/${id}`;

    return this.http.post<any>(url, model, {
      withCredentials: true
    });
  }

  createRequirement(specificationId: number, model): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/specification/${specificationId}/requirement`;

    return this.http.put<any>(url, model, {
      withCredentials: true
    });
  }
}
