import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { MdDialog } from '@angular/material';
import { InfoDialogComponent, InfoDialogField, InfoDialogOutput } from '../infodialog/infodialog.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blog-main',
  templateUrl: './blogmain.component.html',
  styleUrls: ['./blogmain.component.css']
})
export class BlogMainComponent implements OnInit {

  constructor(private blogService: BlogService,
              private dialog: MdDialog,
              private router: Router,
              private route: ActivatedRoute) {}

  blogPages = [];

  newPage() {
    const dialog = this.dialog.open(InfoDialogComponent);
    dialog.componentInstance.fields = [
      {label: 'Page Title', required: true, name: 'title'},
      {label: 'Author', required: true, name: 'author'},
      {label: 'description', required: false, name: 'description'}
    ]
     dialog.afterClosed().subscribe(res => {
      if (res) {
        this.blogService.addPage(res.title, res.author, res.description).subscribe(
          response => {
            this.router.navigate([res.author, res.title], {relativeTo: this.route});
          },
          err => {
            console.log(err);
            // FIXME: Handle Error
          }
        )
      }
    })

  }

  ngOnInit() {
    this.blogService.getLatestPages().subscribe(
      response => {
        this.blogPages = response;
      },
      err => {
        console.log(err);
      }
    )
  }
}
