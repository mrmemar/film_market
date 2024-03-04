import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Genre } from '../../models/genre/genre.model';

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    genres: Array<Genre> = [];
    readonly url = "https://api.themoviedb.org/3/genre/movie/list";
    constructor(private http: HttpClient) {
        this.getAll().subscribe(q => this.genres = q);
    }

    getAll(): Observable<Array<Genre>> {
        return this.http.get<{ genres: Array<Genre> }>(this.url).pipe(map(q => q.genres));
    }

    getName(id: number): any {
        return this.genres.find(q => q.id == id)?.name;
    }

}
