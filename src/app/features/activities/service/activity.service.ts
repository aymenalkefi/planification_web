import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Activity, PageResult } from '../models/activity.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivitySearchCriteria } from '../models/activity-search-criteria.model';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private http = inject(HttpClient);
  private url = `${environment.baseUrl}/activities`;

  getAll() { return this.http.get<Activity[]>(this.url); }
  getById(id: number) { return this.http.get<Activity>(`${this.url}/${id}`); }
  create(a: Activity) { return this.http.post<Activity>(this.url, a); }
  update(id: number, a: Activity) { return this.http.put<Activity>(`${this.url}/${id}`, a); }
  delete(id: number) { return this.http.delete<void>(`${this.url}/${id}`); }
  search(criteria: ActivitySearchCriteria) {
    let params = new HttpParams();
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<Activity[]>(`${this.url}/search`, { params });
  }

  searchPaged(criteria: ActivitySearchCriteria, page: number, size: number, sort: string) {
    let params = new HttpParams().set('page', page).set('size', size).set('sort', sort);
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<PageResult<Activity>>(`${this.url}/search/page`, { params });
  }
}