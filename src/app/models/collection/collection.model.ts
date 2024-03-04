import { Movie } from "../movie/movie.model";

export interface Collection {
    backdrop_path: string;
    id: number;
    name: string;
    overview: string;
    parts: Array<Movie>;
    poster_path: string;
}

