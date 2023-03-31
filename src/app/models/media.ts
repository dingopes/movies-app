import { Movie } from './movie';
import { Tv } from './tv';

export interface Media extends Movie, Tv {}

export interface MediaDto {
  page: number;
  results: Media[];
  total_results: number;
  total_pages: number;
}

export interface MediaVideoDto {
  id: number;
  results: MediaVideo[];
}

export interface MediaVideo {
  site: string;
  key: string;
}

export interface MediaProviderDTO {
  id: number;
  results: MediaProvider[];
}

export interface MediaProvider {}

export interface MediaImages {
  backdrops: {
    file_path: string;
  }[];
}

export interface MediaCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}
