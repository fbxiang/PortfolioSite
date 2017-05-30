import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';

const IDENTITY_TOKEN = 'user:identity_token';

@Injectable()
export class AuthenticationService {

  _identityToken: BehaviorSubject<string>;

  set identityToken(token) {
    if (token === 'null' || !token) token = '';
    this._identityToken.next(token);
  }

  get identityToken() {
    return this._identityToken.getValue();
  }

  refreshSubscription: Subscription;

  isLoggedIn() {
    return this.identityToken;
  }

  constructor(private http: Http) {
    this._identityToken = new BehaviorSubject(localStorage.getItem(IDENTITY_TOKEN));
    this._identityToken.subscribe(token => {
      localStorage.setItem(IDENTITY_TOKEN, token);
      if (!token && this.refreshSubscription) {
        this.refreshSubscription.unsubscribe();
        this.refreshSubscription = null;
      }
      else if (!this.refreshSubscription && token) {
        this.refreshSubscription = this.refreshToken().subscribe(
          newToken => this.identityToken = newToken,
          err => this.identityToken = null
        );
      }

      if (token) {
        console.log("logged in");
      }
      else {
        console.log("not logged in");
      }
    })
  }

  private refreshToken() {
    return Observable.interval(1000000).startWith(0).switchMap(
      (v, i) => {
        return this.http.post('/api/user/refresh', {token: this.identityToken})
      }
    ).map(res => res.text());
  }

  login(username: string, password: string) {
    return this.http
      .post('/api/user/login', {username, password})
      .map(
        res => {
          console.log(res.text());
          this.identityToken = res.text();
          return null;
        }
      )
  }

  logout() {
    this.identityToken = null;
  }
}
