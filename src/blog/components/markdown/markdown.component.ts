import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as MarkdownIt from 'markdown-it';
import * as mk from 'markdown-it-mathjax';

const markdown = MarkdownIt().use(mk());

@Component({
  selector: 'markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {

  @Input() md: string;
  @Output() mdChange = new EventEmitter<string>();

  @Input() editing;

  formattedText() {
    return markdown.render(this.md);
  }

  constructor() {}

  ngOnInit() {}

}
