import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie/movie.service';
import { Movie } from '../../../models/movie/movie.model';
import { PagingComponent } from '../paging/paging.component';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-movie-list',
    standalone: true,
    imports: [PagingComponent, RouterLink],
    templateUrl: './movie-list.component.html',
    styleUrl: './movie-list.component.sass'
})
export class MovieListComponent implements OnInit {
    @Input() title: string = "";
    @Input() size: number = 6;
    items: Array<Movie> = [];
    paging: Object = {};
    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.getMovies(1);
    }

    getMovies(page: number) {
        this.movieService.getTopRated(page).subscribe(q => {
            this.items = q.results;
        });
    }

}
