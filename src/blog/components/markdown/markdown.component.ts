import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';

import * as MarkdownIt from 'markdown-it';
import * as mk from 'markdown-it-mathjax';

import { HighlightJsService } from 'angular2-highlight-js';

const markdown = MarkdownIt().use(mk());

import  'codemirror/mode/markdown/markdown';

@Component({
  selector: 'markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit, AfterViewInit {

  @Input() md: string;
  @Output() mdChange = new EventEmitter<string>();

  @Input() editing;

  onChange() {
    this.mdChange.emit(this.md);
  }

  codemirrorConfig = {lineNumbers: false, mode: 'markdown', lineWrapping: true};

  formattedText() {
    return markdown.render(this.md);
  }

  constructor(private highlightService: HighlightJsService,
              private el: ElementRef) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    let codeElements = this.el.nativeElement.getElementsByTagName('code');
    for (let i = 0; i < codeElements.length; i++){
      this.highlightService.highlight(codeElements[i]);
    }
  }
}
