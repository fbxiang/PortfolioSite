import {Directive, ElementRef, Input} from '@angular/core';

import { HighlightJsService } from 'angular2-highlight-js';

@Directive({
    selector: '[MathJax]'
})
export class MathJaxDirective {
    @Input('MathJax')
    texExpression:string;

  constructor(private el: ElementRef, private highlightService: HighlightJsService) {
    }

    ngOnChanges() {
      this.el.nativeElement.innerHTML = this.texExpression;

      let codeElements = this.el.nativeElement.getElementsByTagName('code');
      for (let i = 0; i < codeElements.length; i++){
        this.highlightService.highlight(codeElements[i]);
      }

      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
    }
}
