import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';

import { Inject } from '@angular/core';

@Component({
  selector: 'blog-login',
  templateUrl: './bloglogin.component.html',
  styleUrls: ['./bloglogin.component.css'],
})
export class BlogLoginComponent implements OnInit {

  constructor(
    private dialogRef: MdDialogRef<BlogLoginComponent>,
    private snackBar: MdSnackBar,
    private auth: AuthenticationService,
  ) {}

  config: MdSnackBarConfig = new MdSnackBarConfig();

  login(f) {
    if (!f.valid) {
      this.snackBar.open('Please fill out Username and Password', "Dismiss", this.config);
    }
    this.auth.login(f.value.username, f.value.password).subscribe(
      res => {
        this.snackBar.open('Welcome', 'Dismiss');
        this.dialogRef.close();
      },
      error => {
        this.snackBar.open('Invalid username or password', "Dismiss");
      }
    );
  }

  ngOnInit() {
    this.config.duration = 5000;
  }
}
