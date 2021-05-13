import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({ providedIn: 'root' })
export class TokenService {
  hasToken() {
    return !!this.getToken();
  }

  setToken(token) {
    if (token != null) {
      window.localStorage.setItem(KEY, token);
    } else {
      alert(
        "The token was null, this way we can't authenticate your credential."
      );
    }
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }
}
