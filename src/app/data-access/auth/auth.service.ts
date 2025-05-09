import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = signal(false);


  public isAuthenticated() {
    return this._isAuthenticated();
  }

}
