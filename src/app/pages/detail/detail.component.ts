import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaCredits, MediaImages, MediaVideo } from 'src/app/models/media';
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
  mediaImages: MediaImages | null = null;
  mediaCredits: MediaCredits | null = null;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getDetail(id);
      this.getMediaVideos(id);
      this.getMediaProviders(id, 'CZ');
      this.getMediaImages(id);
      this.getMediaCredits(id);
    });
  }

  getDetail(id: string) {
    this.moviesService.getDetail(id).subscribe((detailData) => {
      this.detail = detailData;
      console.log(this.detail);
    });
  }

  getMediaCredits(id: string) {
    this.moviesService.getMediaCredits(id).subscribe((mediaCreditData) => {
      const cast = mediaCreditData.cast
        .filter((credit) => credit.profile_path !== null)
        .map((credit) => ({ name: credit.name, profile_path: credit.profile_path }));
      this.mediaCredits = { cast };
      console.log('testmediacredits', this.mediaCredits);
    });
  }

  getMediaVideos(id: string) {
    this.moviesService.getMediaVideos(id).subscribe((mediaVideosData) => {
      this.mediaVideos = mediaVideosData;
      console.log('test', this.mediaVideos);
    });
  }
  getMediaImages(id: string) {
    this.moviesService.getMediaImages(id).subscribe((imagesData) => {
      this.mediaImages = imagesData;
      console.log('test media images', imagesData);
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
