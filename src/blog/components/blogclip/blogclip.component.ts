import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as MarkdownIt from 'markdown-it';
import * as mk from 'markdown-it-mathjax';

const markdown = MarkdownIt().use(mk());

export interface BlogPage {
  title: string,
  author: string,
  description: string,
  body: string,
  date: string
}

@Component({
  selector: 'blog-clip',
  templateUrl: './blogclip.component.html',
  styleUrls: ['./blogclip.component.css']
})
export class BlogClipComponent implements OnInit {

  @Input() blogPage: BlogPage;

  formatText(text) {
    return markdown.render(text);
  }

  getLink() {
    return `${this.blogPage.author}/${this.blogPage.title}`;
  }

  constructor() {}

  ngOnInit() {}
}
