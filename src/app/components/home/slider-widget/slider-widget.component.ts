import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'
import { Movie } from '../../../models/movie/movie.model';
import { MovieService } from '../../../services/movie/movie.service';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-slider-widget',
    standalone: true,
    imports: [CarouselModule, RouterLink],
    templateUrl: './slider-widget.component.html',
    styleUrl: './slider-widget.component.sass'
})
export class SliderWidgetComponent implements OnInit {
    @Input() title: string = "";
    items: Array<Movie> = [];
    options: OwlOptions;

    constructor(private movieService: MovieService) {
        this.options = {
            rtl: true,
            loop: true,
            autoplay: false,
            nav: true,
            navText: ["<div class='slider_actions'><i class='fa fa-chevron-right'></i></div>", "<div class='slider_actions'><i class='fa fa-chevron-left'></i></div>"],
            dots: false,
            center: true,
            items: 1,
        }
    }

    ngOnInit() {
        this.getMovies(1)
    }

    getMovies(page: number) {
        this.movieService.getTopRated(page).subscribe(q => this.items = q.results);
    }
}
