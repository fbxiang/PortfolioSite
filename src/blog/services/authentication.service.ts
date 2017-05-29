import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {}

  login(username: string, password: string) {
    return this.http
      .post('/api/authenticate', {username, password})
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
        }
      })
  }
}
