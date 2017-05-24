import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'blog-page',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.css']
})
export class BlogPageComponent implements OnInit {

  editing = false;

  startEdit() {
    this.editing = true;
  }

  finishEdit() {
    this.editing = false;
  }

  public md =
`
# header
## subheader
* list
$\\frac{\\alpha}{\\beta}$
\`\`\`javascript
for (var i = 0; i < 100; i++) {}
\`\`\`
`

  constructor() {}
  ngOnInit() {}
}
