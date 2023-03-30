import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaVideo } from 'src/app/models/media';
import { Movie } from 'src/app/models/movie';
import { MediaProviderLink } from 'src/app/models/providers';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  detail: Movie | null = null;
  mediaVideos: MediaVideo[] = [];
  imagesSizes = IMAGES_SIZES;
  providersBuy: MediaProviderLink[] = [];
  providersFlatrate: MediaProviderLink[] = [];
  providersRent: MediaProviderLink[] = [];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getDetail(id);
      this.getMediaVideos(id);
      this.getMediaProviders(id, 'CZ');
    });
  }

  getDetail(id: string) {
    this.moviesService.getDetail(id).subscribe((detailData) => {
      this.detail = detailData;
      console.log(this.detail);
    });
  }
  getMediaVideos(id: string) {
    this.moviesService.getMediaVideos(id).subscribe((mediaVideosData) => {
      this.mediaVideos = mediaVideosData;
      console.log('test', this.mediaVideos);
    });
  }

  async getMediaProviders(id: number, locale: string) {
    try {
      const result = await this.moviesService.MediaProviders(id.toString(), locale);
      this.providersBuy = result.buy;
      this.providersFlatrate = result.flatrate;
      this.providersRent = result.rent;
    } catch (error) {
      console.error(error);
    }
  }
}
