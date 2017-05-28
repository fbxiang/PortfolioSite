import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { InfoDialogComponent, InfoDialogOutput } from '../infodialog/infodialog.component'
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blog-page',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.css']
})
export class BlogPageComponent implements OnInit {

  author: string;
  title: string;

  editing = false;

  startEdit() {
    this.editing = true;
  }

  finishEdit() {
    console.log(this.md);
    this.blogService.editPage(this.title, this.author, this.md).subscribe(
      response => {
        console.log(response);
        this.loadPage();
        this.editing = false;
      },
      err => {
        console.log(err);
        // FIXME:
      }
    )
  }

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
            this.router.navigate(['../..', res.author, res.title], {relativeTo: this.route});
          },
          err => {
            console.log(err);
            // FIXME: Handle Error
          }
        )
      }
    })
  }

  deletePage() {
    const dialog = this.dialog.open(InfoDialogComponent);
    dialog.componentInstance.fields = [
      {label: 'Are you sure? (Type Yes/No)', required: true, name: 'confirm'}
    ]
    dialog.afterClosed().subscribe(res => {
      if (res && res['confirm'].toLowerCase() == 'yes') {
        this.blogService.deletePage(this.title, this.author).subscribe(
          response => {
            this.router.navigate(['../..'], {relativeTo: this.route});
          },
          err => {
            console.log(err);
            // FIXME: Handle Error
          }
        )
      }
    })
  }

  public md: string;

  loadPage() {
    this.blogService.getPage(this.title, this.author).subscribe(
      response => {
        this.md = response.body;
      },
      err => {
        console.log(err);
      }
    )
  }

  constructor(private dialog: MdDialog, private blogService: BlogService,
              private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.title && params.author) {
          this.author = params.author;
          this.title = params.title;
          this.loadPage();
        }
      }
    )
  }
}
