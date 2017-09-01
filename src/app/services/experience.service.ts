import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class ExperienceService {

  constructor(private http: Http, private router: Router) { }

  getEducationSummary() {
    return this.http.get(`/api/experience/education.json`).toPromise().then(res => res.json());
  }

  get currentPage() {
    if (this.router.url) {
      const m = this.router.url.match(/experience\/(..*)($|\/)/)
      return decodeURIComponent((m && m[1]) ? m[1] : '');
    }
    return '';
  }
}
