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

  getPortfolio(name: string): Observable<Portfolio[]> {
    return this.http
      .get(`/portfolio?name=${name}`)
      .map(response => response.json());
  }

  getPortfolioPage(name: string, id: string) {
    return this.http
      .get(`/portfolio-page?name=${name}&id=${id}`)
      .map(response => {
        return response.json()
      });
  }

  addPortfolioPage(name: string, id: string, pageName: string) {
    return this.http
      .post(`/add-portfolio-page`, {name, id, pageName})
      .map(response => {
        return response;
      })
  }

  changePortfolioPage(name:string, id: string, index: string, content: string) {
    return this.http
      .post(`/change-portfolio-page`, {name, id, index, content})
      .map(response => {
        return response;
      })
  }
}
