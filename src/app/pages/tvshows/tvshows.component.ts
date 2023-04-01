import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Media, MediaImages } from 'src/app/models/media';
import { Movie } from 'src/app/models/movie';
import { MediaType, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TVshowsComponent implements OnInit {
  movies: Media[] = [];
  mediaImages: MediaImages | null = null;
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  private mediaType = MediaType.TVSHOW;

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMediaByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
    this.getPagedMovies(1);
  }

  getPagedMovies(page: number, searchKeyword?: string) {
    if (!searchKeyword) {
      this.moviesService.getAllMovies(page, this.mediaType).subscribe((movies) => {
        this.movies = movies;
        console.log('searchKeyword="undefined"');
      });
    } else {
      this.moviesService.searchMovies(page, searchKeyword, this.mediaType).subscribe((movies) => {
        this.movies = movies;
        console.log('searchKeyword=', searchKeyword);
      });
    }
  }

  getMediaByGenre(genreId: string, page: number) {
    this.moviesService.getMediaByGenre(genreId, page, this.mediaType).subscribe((movies) => {
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
    this.moviesService.getMediaImages(id, this.mediaType).subscribe((mediaImagesData) => {
      this.mediaImages = mediaImagesData;
    });
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
