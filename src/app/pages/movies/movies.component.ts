import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
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
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('movies init');
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMediaByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
    this.getPagedMovies(1);
    console.log('movies variable', this.movies);
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    if (!searchKeyword) {
      this.moviesService.getAllMovies(page).subscribe((movies) => {
        this.movies = movies;
        console.log('searchKeyword="undefined"');
      });
    } else {
      this.moviesService.searchMovies(page, searchKeyword).subscribe((movies) => {
        this.movies = movies;
        console.log('searchKeyword=', searchKeyword);
      });
    }
  }

  getMediaByGenre(genreId: string, page: number) {
    this.moviesService.getMediaByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMediaByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
  }

  getMediaImages(id: string) {
    this.moviesService.getMediaImages(id).subscribe((mediaImagesData) => {
      this.mediaImages = mediaImagesData;
    });
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
