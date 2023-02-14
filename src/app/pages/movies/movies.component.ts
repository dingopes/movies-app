import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/models/media';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Media[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.searchMovies(2).subscribe((movies) => {
      this.movies = movies;
    });
  }
}
