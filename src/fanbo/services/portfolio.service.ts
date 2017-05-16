import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

interface Portfolio {
  name: string,
  id: string
}

@Injectable()
export class PortfolioService {

  constructor(private http: Http) {}

  getPortfolio(name): Observable<Portfolio[]> {
    return this.http
      .get(`/portfolio?name=${name}`)
      .map(response => response.json());
  }
}
