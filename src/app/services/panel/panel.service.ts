import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, switchMap, tap } from 'rxjs';
import { MovieService } from '../movie/movie.service';
import { Movie } from '../../models/movie/movie.model';
import { AuthService } from '../authentiocation/auth.service';
import { ToastrService } from 'ngx-toastr';
import { List } from '../../models/list/list.model';
import { Router } from '@angular/router';
import { Profile } from '../../models/profile/profile.model';
import { BaseRequest } from '../../models/base-request/cast.model';

@Injectable({
    providedIn: 'root'
})
export class PanelService {
    readonly url: string = "https://api.themoviedb.org/3";
    readonly accountId: number = 20969600;

    session_id: string | null;
    constructor(
        private http: HttpClient,
        private movieService: MovieService,
        private authService: AuthService,
        private toastr: ToastrService,
        private route: Router
    ) {
        this.session_id = this.authService.token.getValue();
    }

    generateUrl(customUrl: string): string {
        return `${this.url}/${customUrl}?session_id=${this.session_id}`
    }

    getProfile(): Observable<Profile> {
        let url = this.generateUrl("/account")
        return this.http.get<Profile>(url).pipe(
            map(q => {
                if (q.avatar.tmdb.avatar_path) {
                    q._pic = `${this.movieService.picAddress}/${q.avatar.tmdb.avatar_path}`;
                }
                return q;
            })
        )
    }

    toggleWatchlist(id: number, add: boolean = true): Observable<BaseRequest> {
        let url = this.generateUrl(`account/${this.accountId}/watchlist`)
        let options = {
            media_type: 'movie',
            media_id: id,
            watchlist: add
        };
        return this.http.post<BaseRequest>
            (url, options).pipe(
                catchError(err => {
                    this.toastr.error("", "")
                    throw err;
                }),
                tap(q => {
                    if (q.success && q.status_code != 1) {
                        //delete
                        this.toastr.success(q.status_message, "کاربر گرامی")
                    } else if (q.success && q.status_code == 1) {
                        //add
                        this.toastr.success(q.status_message, "کاربر گرامی")
                    }
                })
            );
    }

    getWachList(): Observable<Movie[]> {
        let url = this.generateUrl(`account/${this.accountId}/watchlist/movies`)
        return this.http.get<{ results: Movie[] }>(url)
            .pipe(map(q => {
                q.results.forEach(item => this.movieService.customize(item))
                return q.results;
            }));
    }

    isMarked(id: number): Observable<boolean> {
        return this.getWachList().pipe(
            map(q => {
                let find: boolean = false;
                q.forEach(item => {
                    if (item.id == id) {
                        find = true;
                        return;
                    }
                });
                return find;
            })
        )
    }

    getCustomLists(): Observable<List[]> {
        let url = this.generateUrl(`account/${this.accountId}/lists`)
        return this.http.get<{ results: List[] }>(url).pipe(
            map(q => q.results)
        )
    }

    createCustomList(name: string, description: string): Observable<{ status_message: string, success: boolean, list_id: number }> {
        let url = this.generateUrl(`list`);
        let body = {
            name: name,
            description: description,
            language: 'en'
        }
        return this.http.post<{ status_message: string, success: boolean, list_id: number }>(url, body).pipe(
            tap(q => {
                if (q.success) {
                    this.route.navigate(["edit", q.list_id]);
                }
            })
        )
    }

    removeCustomlist(listId: number): Observable<BaseRequest> {
        let url = this.generateUrl(`/list/${listId}`);
        return this.http.delete<BaseRequest>(url).pipe(
            tap(q => {
                if (q.success) {
                    this.toastr.success(q.status_message, "کاربر گرامی");
                }
            })
        )
    }

    getCustomList(id: number): Observable<List> {
        let url = this.generateUrl(`list/${id}`);
        return this.http.get<List>(url).pipe(
            map(q => {
                q.items.forEach(item => this.movieService.customize(item))
                return q;
            })
        )
    }

    addMovie(listId: number, movieId: number): Observable<BaseRequest> {
        let url = this.generateUrl(`/list/${listId}/add_item`);
        let body = { media_id: movieId };
        return this.http.post<BaseRequest>(url, body).pipe(
            catchError(err => {
                this.toastr.error(err.error.status_message, "کاربر گرامی");
                throw err;
            }),
            tap(q => {
                if (q.success) {
                    this.toastr.success(q.status_message, "کاربر گرامی");
                    return this.getCustomList(listId)
                }
                return;
            })
        );
    }

    removeMovie(listId: number, movieId: number): Observable<BaseRequest> {
        let url = this.generateUrl(`/list/${listId}/remove_item`);
        let body = { media_id: movieId };
        return this.http.post<BaseRequest>(url, body).pipe(
            catchError(err => {
                this.toastr.error(err.error.status_message, "کاربر گرامی");
                throw err;
            }),
            tap(q => {
                if (q.success) {
                    this.toastr.success(q.status_message, "کاربر گرامی");
                }
                return;
            })
        );
    }
}
