import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie/movie.model';
import { MovieService } from '../../services/movie/movie.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-relateds',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './relateds.component.html',
    styleUrl: './relateds.component.sass'
})
export class RelatedsComponent implements OnInit {
    @Input() id: number = 0;
    @Input() size: number = 10;
    relatedItems: Array<Movie> = [];
    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies() {
        this.movieService.getRelated(this.id).subscribe(q => this.relatedItems = q.results);
    }
}
