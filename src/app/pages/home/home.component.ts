import { Component, OnInit } from '@angular/core';
import { Tv } from '../../models/tv';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { Media } from 'src/app/models/media';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Media[] = [];
  upcomingMovies: Media[] = [];
  topRatedMovies: Media[] = [];
  popularTv: Media[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((media) => {
      this.popularMovies = media;
    });
    this.moviesService.getMovies('top_rated').subscribe((media) => {
      this.topRatedMovies = media;
    });
    this.moviesService.getMovies('upcoming').subscribe((media) => {
      this.upcomingMovies = media;
    });
    this.moviesService.getTv('popular').subscribe((media) => {
      this.popularTv = media;
    });
  }
}
