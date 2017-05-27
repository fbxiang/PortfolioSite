import {Directive, ElementRef, Input} from '@angular/core';

import { HighlightJsService } from 'angular2-highlight-js';

@Directive({
    selector: '[MathCode]'
})
export class MathCodeDirective {
  @Input('MathCode') texExpression:string;

  @Input('CompileMath') compileMath: boolean;

  constructor(private el: ElementRef, private highlightService: HighlightJsService) {

  }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = this.texExpression;

    let codeElements = this.el.nativeElement.getElementsByTagName('code');
    for (let i = 0; i < codeElements.length; i++){
      if (codeElements[i].className)
        this.highlightService.highlight(codeElements[i]);
    }

    console.log('[compile math]', this.compileMath)
    if (this.compileMath)
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
  }
}
