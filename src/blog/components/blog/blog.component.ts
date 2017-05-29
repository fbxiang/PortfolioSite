import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { BlogLoginComponent } from '../bloglogin/bloglogin.component';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent {
  constructor(
    private dialog: MdDialog
  ) {}
  ngOnInit() {}

  login() {
    this.dialog.open(BlogLoginComponent);
  }

}
