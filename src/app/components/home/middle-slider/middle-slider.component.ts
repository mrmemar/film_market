import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../models/movie/movie.model';
import { MovieService } from '../../../services/movie/movie.service';
@Component({
    selector: 'app-middle-slider',
    standalone: true,
    imports: [CarouselModule, RouterLink],
    templateUrl: './middle-slider.component.html',
    styleUrl: './middle-slider.component.scss'
})
export class MiddleSliderComponent implements OnInit {
    @Input() title: string = "";
    @Input() sort: string = "";
    items: Array<Movie> = [];
    options: OwlOptions;
    constructor(private movieService: MovieService) {
        this.options = {
            items: 6,
            margin: 24,
            rtl: true,
            loop: false,
            autoplay: false,
            nav: false,
            //navText: ["",""],
            dots: true,
            responsive: {
                0: { items: 3, },
                600: { items: 2, },
                1000: { items: 1, }
            }
        }
    }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies() {
        this.movieService.getList({ sort: this.sort }).subscribe(q => this.items = q.results);
    }

}
