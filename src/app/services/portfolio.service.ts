import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { PortfolioSummary } from '../models';
import { Router, CanActivate } from '@angular/router';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class PortfolioService implements CanActivate{

  _portfolioSummaries: PortfolioSummary[] = [];
  get portfolioSummaries() {
    return this._portfolioSummaries;
  }

  get currentPage() {
    if (this.router.url) {
      const m = this.router.url.match(/portfolio\/(..*)($|\/)/);
      return decodeURIComponent((m && m[1]) ? m[1] : '');
    } else {
      return '';
    }
  };

  constructor(private http: Http, private router: Router) {
    this.updatePortfolioSummaries();
  }

  updatePortfolioSummaries() {
    return this.http.get(`/api/portfolio/summary`).toPromise()
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

  getImageUrl(filename: string) {
    return `/api/image/${filename}`;
  }

  canActivate() {
    if (this.portfolioSummaries.length) {
      return true;
    }
    return this.updatePortfolioSummaries().then(_ => true).catch(_ => false);
  }
}
