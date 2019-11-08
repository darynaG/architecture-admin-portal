import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from '../../config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(sortField, sortDirection, pageIndex, pageSize): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual?pageIndex=${pageIndex}`;

    return this.http.get<any>(url, {
      withCredentials: true
    });
  }

  delete(id: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual/${id}`;

    return this.http.delete<any>(url, {
      withCredentials: true
    });
  }

  create(priceExtract): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual`;

    return this.http.put<any>(url, priceExtract, {
      withCredentials: true
    });
  }

  update(id, priceExtract): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual/${id}`;

    return this.http.post<any>(url, priceExtract, {
      withCredentials: true
    });
  }

 /* deleteThreshold(priceThresholdId: number, priceExtractId: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual/${priceExtractId}/thresholds/${priceThresholdId}`;

    return this.http.delete<any>(url, {
      withCredentials: true
    });
  }

  getThresholdsForExtract(extractId: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual/${extractId}/thresholds`;

    return this.http.get<any>(url, {
      withCredentials: true
    });
  }*/

}
