import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { PortfolioSummary } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class PortfolioService {

  _portfolioSummaries: PortfolioSummary[] = [];
  get portfolioSummaries() {
    return this._portfolioSummaries;
  }

  get currentPage() {
    return decodeURIComponent(this.router.url.match(/portfolio\/(..*)($|\/)/)[1]);
  };

  constructor(private http: Http, private router: Router) {
    this.updatePortfolioSummaries();
  }

  updatePortfolioSummaries() {
    this.http.get(`/api/portfolio/summary`).toPromise()
      .then(res => res.json())
      .then(s => this._portfolioSummaries = s)
  }

  getSummaryByName(name: string) {
    return this.portfolioSummaries.find(s => s.name == name);
  }

  getMarkdown(filename: string) {
    return this.http.get(`/api/portfolio/${filename}`).toPromise()
      .then(res => res.text())
  }
}
