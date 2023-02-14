import { Movie } from './movie';
import { Tv } from './tv';

export interface Media extends Movie, Tv {}

export interface MediaDto {
  page: number;
  results: Media[];
  total_results: number;
  total_pages: number;
}
