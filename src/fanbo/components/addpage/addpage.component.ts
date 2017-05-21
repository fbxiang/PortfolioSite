import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { PortfolioService } from '../../services/portfolio.service';

export interface PageInfo {
  id: string,
  name: string
}

@Component({
  selector: 'addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css']
})
export class AddPageComponent implements OnInit {
  private submitError:string;

  submit(f: NgForm) {
    if (f.valid) {
      let value = f.value as PageInfo;
      this.portfolioService.addPortfolioPage("fanboxiang", value.id, value.name)
        .subscribe(response => {
          if (response.ok)
            this.dialogRef.close();
        }, error => {
          this.submitError = error._body;
        }, () => {})
      // submit the form
    }
  }
  constructor(private dialogRef: MdDialogRef<AddPageComponent>,
              private portfolioService: PortfolioService) {}
  ngOnInit() {}
}
