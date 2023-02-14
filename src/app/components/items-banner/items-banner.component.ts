import { Component, Input } from '@angular/core';
import { Media } from 'src/app/models/media';
import { Tv } from 'src/app/models/tv';
import { Movie } from '../../models/movie';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {
  @Input() items: Media[] = [];
  @Input() title: string = '';
}
