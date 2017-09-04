import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface GalleryCard {
  img: string,
  url: string
}

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public cards: GalleryCard[] = [
    {img: "../../assets/main_unity.png", url:"/portfolio/Unity3d projects"},
    {img: "../../assets/main_android.png", url:"/portfolio/CUMTD Bus Assistant"},
    {img: "../../assets/main_physics.png", url:"/portfolio/2D Physics Engine"},
    {img: "../../assets/main_music.png", url:"/experience/other"}
  ]

  constructor(private location: Location) { }

  ngOnInit() {
  }

}
