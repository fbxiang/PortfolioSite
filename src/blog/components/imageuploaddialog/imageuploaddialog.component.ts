import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'imageuploaddialog',
  templateUrl: './imageuploaddialog.component.html',
  styleUrls: ['./imageuploaddialog.component.css']
})
export class ImageUploadDialogComponent implements OnInit {
  @ViewChild('myTarget') target: ElementRef;
  @Input() author: string;
  @Input() title: string;

  image = {};
  blob = null;
  url = "";

  constructor(private dialogRef: MdDialogRef<ImageUploadDialogComponent>,
              private blogService: BlogService) {}

  ngOnInit() {
    (<any>document).onpaste = event => {
      let items: any[] = (event.clipboardData || event.originalEvent.clipboardData).items;
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        if (items[i].type && items[i].type.includes('image')) {
          this.blob = items[i].getAsFile();
        }
      }

      if (this.blob !== null) {
        var reader = new FileReader();
        reader.onload = event => {
          let url = (<any>event.target).result;
          this.target.nativeElement.style.background = `url(${url}) no-repeat center center fixed`;

          var img = new Image();
          img.addEventListener("load", () => {
            let width = img.naturalWidth;
            let height = img.naturalHeight;
            this.target.nativeElement.style.background = `url(${url}) no-repeat center center`;
            this.target.nativeElement.style['background-size'] = 'cover';

            let factor = Math.min(30 / height, 50 / width);

            this.target.nativeElement.style.width = factor * width + 'vw';
            this.target.nativeElement.style.height = factor * height + 'vw';
          });
          img.src = url;
        }
        reader.readAsDataURL(this.blob);
      }
    }
  }

  onSubmit(f) {
    console.log(f);
    if (f.valid && this.blob) {
      this.blogService.uploadImage(this.blob, f.value.name, `${this.author}/${this.title}`).subscribe(
        res => {
          this.url = res.url.split(' ').join('%20');
        },
        err => console.log('error', err)
      )
    }
  }

  done() {
    this.dialogRef.close();
  }
}
