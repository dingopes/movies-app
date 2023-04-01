import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Movie, MovieDto } from '../models/movie';
import { TvDto } from '../models/tv';
import { Media, MediaCredits, MediaDto, MediaImages, MediaVideoDto } from '../models/media';
import { Observable, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { MediaProviderLink, MediaProviders, MediaProvidersLists } from '../models/providers';
import { GenresDto } from '../models/genre';

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

  getMovies(type: string = 'upcoming', count: number = 12, mediaType: MediaType = MediaType.MOVIE) {
    let url = `${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`;
    if (mediaType === MediaType.TVSHOW) {
      url = `${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`;
    }
    return this.http.get<MediaDto>(url).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getMediaByGenre(genreId: string, pageNumber: number, mediaType: MediaType = MediaType.MOVIE) {
    const url = `${this.baseUrl}/discover/${mediaType}?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`;
    return this.http.get<MediaDto>(url).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getMediaVideos(id: string, mediaType: MediaType = MediaType.MOVIE) {
    return this.http
      .get<MediaVideoDto>(`${this.baseUrl}/${mediaType}/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMediaGengres(mediaType: MediaType = MediaType.MOVIE) {
    return this.http
      .get<GenresDto>(`${this.baseUrl}/genre/${mediaType}/list?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  getMediaImages(id: string, mediaType: MediaType = MediaType.MOVIE) {
    return this.http.get<MediaImages>(
      `${this.baseUrl}/${mediaType}/${id}/images?api_key=${this.apiKey}`
    );
  }

  getMediaCredits(id: string, mediaType: MediaType = MediaType.MOVIE) {
    return this.http.get<MediaCredits>(
      `${this.baseUrl}/${mediaType}/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getDetail(id: string, mediaType: MediaType = MediaType.MOVIE) {
    return this.http.get<Movie>(`${this.baseUrl}/${mediaType}/${id}?api_key=${this.apiKey}`).pipe();
  }

  getSimilarMedia(id: string, mediaType: MediaType = MediaType.MOVIE) {
    return this.http
      .get<MediaDto>(`${this.baseUrl}/${mediaType}/${id}/similar?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  searchMovies(page: number, searchValue?: string, mediaType: MediaType = MediaType.MOVIE) {
    const uri = searchValue ? `/search/${mediaType}` : `${mediaType}/popular`;
    let fullUrl = `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`;

    console.log('test search fullUrl', fullUrl);
    return this.http.get<MediaDto>(fullUrl).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getAllMovies(page: number, mediaType: MediaType = MediaType.MOVIE) {
    return this.http
      .get<MediaDto>(`${this.baseUrl}/${mediaType}/popular?page=${page}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  testSearchMovies(page: number, mediaType: MediaType = MediaType.MOVIE) {
    return this.http
      .get<MediaDto>(`${this.baseUrl}/${mediaType}/popular?page=${page}&api_key=${this.apiKey}`)
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

  async MediaProviders(
    id: string,
    locale: string,
    mediaType: MediaType = MediaType.MOVIE
  ): Promise<MediaProvidersLists> {
    const response = await fetch(
      `${this.baseUrl}/${mediaType}/${id}/watch/providers?api_key=${this.apiKey}`
    );

    const jsonData: MediaProviders = await response.json();
    const buy = Object.values(jsonData.results[locale]?.buy || {});
    const flatrate = Object.values(jsonData.results[locale]?.flatrate || {});
    const rent = Object.values(jsonData.results[locale]?.rent || {});
    const providers: MediaProvidersLists = { buy: buy, flatrate: flatrate, rent: rent };
    return providers;
  }
}

export enum MediaType {
  MOVIE = 'movie',
  TVSHOW = 'tv'
}
