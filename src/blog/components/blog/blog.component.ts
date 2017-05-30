import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { BlogLoginComponent } from '../bloglogin/bloglogin.component';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent {
  constructor(
    private dialog: MdDialog,
    private auth: AuthenticationService
  ) {}
  ngOnInit() {
  }

  login() {
    this.dialog.open(BlogLoginComponent);
  }

  logout() {
    this.auth.logout();
  }
}
