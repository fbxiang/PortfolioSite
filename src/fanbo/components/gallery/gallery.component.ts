import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface GalleryCard {
  img: string,
  href: string
}

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public cards: GalleryCard[] = [
    {img: "../../assets/main_unity.png", href:"unity"},
    {img: "../../assets/main_android.png", href:"android"},
    {img: "../../assets/main_physics.png", href:"physics"},
    {img: "../../assets/main_music.png", href:"music"}
  ]

  constructor(private location: Location) { }

  ngOnInit() {
  }

}
