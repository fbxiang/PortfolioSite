import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { PortfolioSummary } from '../models';

@Injectable()
export class PortfolioService {

  _portfolioSummaries: PortfolioSummary[];
  get portfolioSummaries() {
    return this._portfolioSummaries;
  }

  constructor(private http: Http) { }

  updatePortfolioSummaries() {
    this.http.get(`/api/portfolio/summary`).toPromise()
      .then(res => res.json())
      .then(s => this._portfolioSummaries = s)
  }

  getMarkdown(filename: string) {
    this.http.get(`/api/portfolio/filename`).toPromise()
      .then(res => res.json())
  }
}
