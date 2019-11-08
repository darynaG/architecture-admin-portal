import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getThresholdsForExtract(extractId: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual/${extractId}/thresholds`;

    return this.http.get<PriceThresholdManualCollection>(url, {
      withCredentials: true
    });
  }

  getAll(sortField, sortDirection, pageIndex, pageSize): Observable<any> {
    let url = ConfigService.getApiUrl() + `/v3/price_extracts_manual?pageIndex=${pageIndex}`;

    return this.http.get<any>(url, {
      withCredentials: true
    });
  }

  delete(id: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual/${id}`;

    return this.http.delete<any>(url, {
      withCredentials: true,
      headers: this.authStateService.createAuthHeaders()
    });
  }

  deleteThreshold(priceThresholdId: number, priceExtractId: number): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual/${priceExtractId}/thresholds/${priceThresholdId}`;

    return this.http.delete<any>(url, {
      withCredentials: true,
      headers: this.authStateService.createAuthHeaders()
    });
  }

  createPriceExtract(priceExtract): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual`;

    return this.http.put<any>(url, priceExtract, {
      withCredentials: true,
      headers: this.authStateService.createAuthHeaders()
    });
  }

  updatePriceExtract(id, priceExtract): Observable<any> {
    const url = ConfigService.getApiUrl() + `/v3/price_extracts_manual/${id}`;

    return this.http.post<any>(url, priceExtract, {
      withCredentials: true,
      headers: this.authStateService.createAuthHeaders()
    });
  }

}
