import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Movie } from '../../models/movie/movie.model';
import { GenreService } from '../genre/genre.service';
import { Cast } from '../../models/cast/cast.model';
import { Collection } from '../../models/collection/collection.model';
import { Review } from '../../models/review/review.model';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    readonly url: string = "https://api.themoviedb.org/3";
    readonly picAddress: string = "https://media.themoviedb.org/t/p/w220_and_h330_face";

    constructor(private http: HttpClient, private genreService: GenreService) {

    }

    getTopRated(page: number = 1): Observable<{ results: Array<Movie>, page: number, total_pages: number }> {
        return this.http.get<{ results: Array<Movie>, page: number, total_pages: number }>(`${this.url}/movie/top_rated?page=${page}`)
            .pipe(map(q => {
                q.results.forEach(item => { item = this.customize(item); });
                return q;
            }));
    }

    customize(item: Movie): Movie {
        item._genresNames = [];
        if (item.genre_ids && item.genre_ids.length > 0) {
            item.genre_ids.forEach(genreId => {
                item._genresNames?.push(this.genreService.getName(genreId));
            });
        }
        item._detailLink = `/detail/`;
        item._detailTitle = item.title.replaceAll(/ /g, '-')
        // item.listLink = `/list/${item.id}/${item.title}`;
        if (item.poster_path) item.poster_path = `${this.picAddress}${item.poster_path}`;
        else item.poster_path = '../../../assets/images/default_poster.jpg';
        item._onerror = 'this.onerror=false;this.src="../../../assets/images/default_poster.jpg"';
        item.backdrop_path = `https://image.tmdb.org/t/p/original${item.backdrop_path}`
        item.vote_average = parseFloat(item.vote_average.toFixed(1));
        return item;
    }

    get(id: number): Observable<Movie> {
        return this.http.get<Movie>(`${this.url}/movie/${id}`)
            .pipe(map(q => this.customize(q)));
    }

    getRelated(id: number, page: number = 1): Observable<{ results: Array<Movie> }> {
        return this.http.get<{ results: Array<Movie> }>(`${this.url}/movie/${id}/similar?page=${page}`)
            .pipe(map(q => {
                q.results.forEach(item => { item = this.customize(item) });
                return q;
            }));
    }

    getCredits(id: number): Observable<{ cast: Array<Cast> }> {
        return this.http.get<{ cast: Array<Cast> }>(`${this.url}/movie/${id}/credits`)
            .pipe(map(q => {
                q.cast.forEach(item => item.profile_path = `${this.picAddress}${item.profile_path}`);
                return q;
            }));
    }

    getKeywords(id: number): Observable<Array<{ id: number, name: string }>> {
        return this.http.get<{ keywords: Array<{ id: number, name: string }> }>(`${this.url}/movie/${id}/keywords`)
            .pipe(map(q => q.keywords))
    }

    collection(id: number): Observable<Collection> {
        return this.http.get<Collection>(`${this.url}/collection/${id}`)
            .pipe(map(q => {
                q.backdrop_path = `https://image.tmdb.org/t/p/w780${q.backdrop_path}`;
                q.parts.forEach(item => { item = this.customize(item); });
                return q;
            }));
    }

    getRiviews(id: number): Observable<Review[]> {
        return this.http.get<{ results: Review[] }>(`${this.url}/movie/${id}/reviews`)
            .pipe(map(q => q.results));
    }

    getList(options?: object): Observable<{ isLoading: boolean, results: Movie[], page: number, total_pages: number }> {
        let opt = Object.assign({}, {
            page: 1,
            sort: 'popularity',
            asc: false,
            with_genres: '',
            with_keywords: ''
        }, options);
        if (!opt.with_genres) { opt.with_genres = "" }
        if (!opt.with_keywords) { opt.with_keywords = "" }
        let query = `page=${opt.page}&sort_by=${opt.sort}.${(opt.asc) ? 'asc' : 'desc'}&with_genres=${opt.with_genres}&with_keywords=${opt.with_keywords}`
        return this.http.get<{ isLoading: boolean, results: Movie[], page: number, total_pages: number }>
            (`${this.url}/discover/movie?${query}`).pipe(
                map(q => {
                    q.isLoading = true;
                    q.results.forEach(item => { item = this.customize(item); });
                    return q;
                }),
                tap((q) => {
                    q.isLoading = false;
                })
            );
    }

    search(query: string): Observable<Movie[]> {
        return this.http.get<{ results: Movie[] }>(`${this.url}/search/movie?query=${query}`).pipe(
            map(q => {
                q.results.forEach(item => this.customize(item));
                return q.results;
            })
        )
    }
}
