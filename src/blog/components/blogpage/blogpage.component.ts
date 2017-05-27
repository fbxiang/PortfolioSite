import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { InfoDialogComponent } from '../infodialog/infodialog.component'

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

  newPage() {
    const dialog = this.dialog.open(InfoDialogComponent);
    dialog.componentInstance.fields = [
      {name: 'Page Title', required: true},
      {name: 'Author', required: true},
      {name: 'description', required: false}
    ]
    dialog.afterClosed().subscribe(res => {
      if (res) {
        // FIXME: Create New Page
      }
    })
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

  constructor(private dialog: MdDialog) {}
  ngOnInit() {}
}
