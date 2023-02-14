import { Component, Input, OnInit } from '@angular/core';
import { Media } from 'src/app/models/media';
import { Tv } from 'src/app/models/tv';
import { Movie } from '../../models/movie';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Media | null = null;

  title: string = '';

  imagesSizes = IMAGES_SIZES;
  constructor() {}

  ngOnInit(): void {
    if (this.itemData?.name != undefined) {
      this.title = this.itemData?.name;
    } else if (this.itemData?.title != undefined) {
      this.title = this.itemData?.title;
    }
  }
}
