import { Genre } from "../genre/genre.model";

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    _genresNames?: Array<string>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: string;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    _detailLink?: string;
    _detailTitle?: string;
    _listLink?: string;

    belongs_to_collection?: { id: number };
    budget: number;
    genres: Array<Genre>;
    homepage: string;
    imdb_id: string;
    production_companies: Array<Object>;
    production_countries: Array<{ iso_3166_1: string, name: string }>;
    revenue: number;
    runtime: number;
    spoken_languages: Array<Object>;
    status: string;
    tagline: string;
    _onerror: string;
}

