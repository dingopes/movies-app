import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaVideo } from 'src/app/models/media';
import { Movie } from 'src/app/models/movie';
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
  mediaProviders: MediaProvider[] = [];
  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getDetail(id);
      this.getMediaVideos(id);
      this.getMediaProviders(id);
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
    });
  }

  getMediaProviders(id: string) {
    this.moviesService.getMediaProviders(id).subscribe((mediaProvidersData) => {
      this.mediaProviders = mediaProvidersData;
    });
  }
}
