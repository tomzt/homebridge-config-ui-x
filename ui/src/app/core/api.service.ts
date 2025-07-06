import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { environment } from '@/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private $http = inject(HttpClient)

  public get(url: string, options?): Observable<any> {
    return this.$http.get(`${environment.api.base}${url}`, options)
  }

  public post(url: string, body: any | null, options?): Observable<any> {
    return this.$http.post(`${environment.api.base}${url}`, body, options)
  }

  public put(url: string, body: any | null, options?): Observable<any> {
    return this.$http.put(`${environment.api.base}${url}`, body, options)
  }

  public patch(url: string, body: any | null, options?): Observable<any> {
    return this.$http.patch(`${environment.api.base}${url}`, body, options)
  }

  public delete(url: string, options?): Observable<any> {
    return this.$http.delete(`${environment.api.base}${url}`, options)
  }
}
