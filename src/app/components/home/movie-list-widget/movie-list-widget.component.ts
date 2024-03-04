import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie/movie.service';
import { Movie } from '../../../models/movie/movie.model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-movie-list-widget',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './movie-list-widget.component.html',
    styleUrl: './movie-list-widget.component.sass'
})
export class MovieListWidgetComponent implements OnInit {
    @Input() title: string = "";
    @Input() size: number = 10;
    items: Array<Movie> = [];
    genreId: number = 0;

    constructor(private movieService: MovieService, private route: ActivatedRoute) {
        this.genreId = this.route.snapshot.queryParams['genre']
    }

    ngOnInit(): void {
        this.getMovies(this.genreId)
    }

    getMovies(genreId: number) {
        let options = {
            sort: "vote_average",
            asc: false,
            with_genres: genreId
        }
        this.movieService.getList(options).subscribe(q => this.items = q.results);
    }
}
