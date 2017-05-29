import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlogService {

  constructor(private http: Http) {}

  addPage(title: string, author: string, description: string) {
    return this.http
      .post(`/api/blog/page/add`, {title, author, description})
      .map(response => {
        return response;
      })
  }

  deletePage(title: string, author: string) {
    return this.http
      .post(`/api/blog/page/delete`, {title, author})
      .map(response => {
        return response;
      })
  }

  getPage(title: string, author: string) {
    return this.http
      .get(`/api/blog/page?title=${title}&author=${author}`)
      .map(response => {
        return response.json();
      })
  }

  getLatestPages() {
    return this.http
      .get('/api/blog/latest')
      .map(response => {
        return response.json();
      })
  }

  editPage(title:string, author: string, body: string) {
    return this.http
      .post(`/api/blog/page/edit`, {title, author, body})
      .map(response => {
        return response;
      })
  }
}
