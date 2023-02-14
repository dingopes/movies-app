import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MovieDto } from '../models/movie';
import { TvDto } from '../models/tv';
import { MediaDto } from '../models/media';
import { switchMap } from 'rxjs';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  constructor(private httpClient: HttpClient) {}
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '90f63e91ab7a7142568eff360d43e495';

  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MediaDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  searchMovies(page: number) {
    return this.http
      .get<MediaDto>(`${this.baseUrl}/movie/popular?page=${page}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTv(type: string = 'popular', count: number = 12) {
    return this.http.get<MediaDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }
}
