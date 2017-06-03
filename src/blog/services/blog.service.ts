import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class BlogService {

  constructor(private http: Http, private auth: AuthenticationService) {}

  addPage(title: string, author: string, description: string) {
    return this.auth
      .post(`/api/blog/page/add`, {title, author, description})
      .map(response => {
        return response;
      })
  }

  deletePage(title: string, author: string) {
    return this.auth
      .post(`/api/blog/page/delete`, {title, author})
      .map(response => {
        return response;
      })
  }

  getPage(title: string, author: string) {
    return this.auth
      .get(`/api/blog/page?title=${title}&author=${author}`)
      .map(response => {
        return response.json();
      })
  }

  getLatestPages() {
    return this.auth
      .get('/api/blog/latest')
      .map(response => {
        return response.json();
      })
  }

  editPage(title:string, author: string, body: string) {
    return this.auth
      .post(`/api/blog/page/edit`, {title, author, body})
      .map(response => {
        return response;
      })
  }

  getAllPages() {
    return this.auth.get('/api/blog/all')
      .map(response => {
        return response.json();
      })
  }

  uploadImage(blob, filename, author, title) {
    let formData = new FormData();
    formData.append('image', blob, filename);
    formData.append('author', author);
    formData.append('title', title)
    return this.auth.post('/api/blog/image/upload', formData)
      .map(res => res.json());
  }
}
