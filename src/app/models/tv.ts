export interface Tv {
  adult: boolean;
  backdrop_path: String;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TvDto {
  page: number;
  results: Tv[];
  total_results: number;
  total_pages: number;
}
