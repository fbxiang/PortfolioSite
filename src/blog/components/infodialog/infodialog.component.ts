import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

export interface InfoDialogField {
  name: string,
  label: string,
  required: boolean
}

export interface InfoDialogOutput {
  name: string,
  content: string
}

@Component({
  selector: 'info-dialog',
  templateUrl: './infodialog.component.html',
  styleUrls: ['./infodialog.component.css']
})
export class InfoDialogComponent {
  @Input() fields: InfoDialogField[];

  onSubmit(f) {
    if (f.valid) {
      this.dialogRef.close(f.value);
    }
  }

  constructor(private dialogRef: MdDialogRef<InfoDialogComponent>) {}
  ngOnInit() {}
}
