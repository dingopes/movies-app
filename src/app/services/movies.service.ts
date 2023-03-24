import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Movie, MovieDto } from '../models/movie';
import { TvDto } from '../models/tv';
import { Media, MediaDto, MediaVideoDto } from '../models/media';
import { Observable, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { MediaProviderLink, MediaProviders, MediaProvidersLists } from '../models/providers';

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

  getMediaVideos(id: string) {
    return this.http
      .get<MediaVideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getDetail(id: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`).pipe();
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

  // getMediaProvider(id: string) {
  //   return this.http
  //     .get<any>(`${this.baseUrl}/movie/${id}/watch/providers?api_key=${this.apiKey}`)
  //     .pipe(
  //       switchMap((res) => {
  //         return of(res.results);
  //       })
  //     );
  // }

  async MediaProviders(id: string, locale: string): Promise<MediaProvidersLists> {
    const response = await fetch(
      `${this.baseUrl}/movie/${id}/watch/providers?api_key=${this.apiKey}`
    );

    const jsonData: MediaProviders = await response.json();
    console.log('test providers', jsonData);
    const buy = Object.values(jsonData.results[locale]?.buy || {});
    const flatrate = Object.values(jsonData.results[locale]?.flatrate || {});
    const rent = Object.values(jsonData.results[locale]?.rent || {});
    const providers: MediaProvidersLists = { buy: buy, flatrate: flatrate, rent: rent };
    return providers;
  }
}
