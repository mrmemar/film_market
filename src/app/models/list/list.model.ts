import { Movie } from "../movie/movie.model";

export interface List {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    iso_3166_1: string;
    list_type: string;
    name: string;
    poster_path: string;

    created_by: string;
    items: Movie[];
    total_pages: number;
    total_results: number;
}

