import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);

  login(username: string, password: string): Observable<never> {
    const body = { username, password };
    return this.http.post<never>(environment.apiBaseUrl + 'auth/login', body)
  }
}
