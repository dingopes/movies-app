import { Component, OnInit } from '@angular/core';
import { Media, MediaImages } from 'src/app/models/media';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Media[] = [];
  mediaImages: MediaImages | null = null;
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPagedMovies(1);
  }

  getPagedMovies(page: number) {
    this.moviesService.searchMovies(page).subscribe((movies) => {
      this.movies = movies;
    });
  }
  paginate(event: any) {
    this.getPagedMovies(event.page + 1);
  }

  getMediaImages(id: string) {
    this.moviesService.getMediaImages(id).subscribe((mediaImagesData) => {
      this.mediaImages = mediaImagesData;
    });
  }
}
