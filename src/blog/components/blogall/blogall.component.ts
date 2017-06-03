import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'blog-all',
  templateUrl: './blogall.component.html',
  styleUrls: ['./blogall.component.css']
})

export class BlogAllComponent implements OnInit {
  pages = [];

  constructor(private blogService: BlogService) {}

  private getPageLink(page) {
    return `../${page.author}/${page.title}`;
  }

  ngOnInit() {
    this.blogService.getAllPages().subscribe(response => {
      this.pages = response;
      console.log(this.pages);
    })
  }
}
