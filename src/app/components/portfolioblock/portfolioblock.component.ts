import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import * as mk from 'markdown-it-mathjax';

const markdown = MarkdownIt({ html: true, linkify: true, typographer: true }).use(mk());

@Component({
  selector: 'portfolio-block',
  templateUrl: './portfolioblock.component.html',
  styleUrls: ['./portfolioblock.component.css']
})
export class PortfolioBlockComponent implements OnInit {

  @Input() md: string;

  private editing: boolean = false;

  markdownToHtml() {
    const rendered = markdown.render(this.md);
    return markdown.render(this.md);
  }

  constructor() { }

  ngOnInit() {
  }
}
