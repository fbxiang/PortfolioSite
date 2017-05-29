import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'blog-login',
  templateUrl: './bloglogin.component.html',
  styleUrls: ['./bloglogin.component.css']
})
export class BlogLoginComponent implements OnInit {

  constructor(
    private dialogRef: MdDialogRef<BlogLoginComponent>,
    private snackBar: MdSnackBar
  ) {}

  config: MdSnackBarConfig = new MdSnackBarConfig();

  login(f) {
    if (!f.valid) {
      this.snackBar.open('Please fill out Username and Password', "Dismiss", this.config);
    }

  }

  ngOnInit() {
    this.config.duration = 5000;
  }
}
