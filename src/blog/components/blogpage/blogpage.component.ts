import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { InfoDialogComponent, InfoDialogOutput } from '../infodialog/infodialog.component'
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ImageUploadDialogComponent } from '../imageuploaddialog/imageuploaddialog.component';

@Component({
  selector: 'blog-page',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.css']
})
export class BlogPageComponent implements OnInit {

  author: string;
  title: string;
  date: string;

  editing = false;

  constructor(private dialog: MdDialog,
              private blogService: BlogService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthenticationService,
              private snackBar: MdSnackBar) {}

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
        this.snackBar.open("Please log in first.", "Dismiss", {duration: 5000});
        this.editing = false;
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
            this.snackBar.open("Please log in first.", "Dismiss", {duration: 5000});
            this.editing = false;
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
            this.snackBar.open("Please log in first.", "Dismiss", {duration: 5000});
            this.editing = false;
          }
        )
      }
    })
  }

  uploadImage() {
    const dialog = this.dialog.open(ImageUploadDialogComponent);
    dialog.componentInstance.author = this.author;
    dialog.componentInstance.title = this.title;
  }

  public md: string;

  loadPage() {
    this.blogService.getPage(this.title, this.author).subscribe(
      response => {
        this.md = response.body;
        this.date = response.date.substr(0,10);
      },
      err => {
        console.log(err);
      }
    )
  }

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
