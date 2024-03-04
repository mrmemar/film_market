import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Movie } from '../../../models/movie/movie.model';
import { MovieService } from '../../../services/movie/movie.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-main-slider',
    standalone: true,
    imports: [CarouselModule, RouterLink],
    templateUrl: './main-slider.component.html',
    styleUrl: './main-slider.component.sass'
})
export class MainSliderComponent implements OnInit {
    @ViewChild("mixSlider") mixSlider: ElementRef<any> = {} as ElementRef;
    defaultItem: Movie = {} as Movie;
    items: Array<Movie> = [];
    options: OwlOptions;

    constructor(private movieService: MovieService) {
        this.options = {
            items: 6,
            rtl: false,
            loop: true,
            margin: 40,
            center: true,
            autoplay: true,
            autoplayTimeout: 10 * 1000,
            autoplayHoverPause: true,
            dots: false,
            responsive: {
                0: { items: 1, center: true, stagePadding: 80, margin: 20, },
                450: { items: 2, margin: 20 },
                650: { items: 2, margin: 20 },
                750: { items: 3, margin: 20 },
                900: { items: 5, },
                1200: { items: 6 }
            }
        };
    }

    ngOnInit(): void {
        document.getElementsByClassName("header")[0].classList.add("header-single");
        this.getMovies();
    }

    getMovies() {
        this.movieService.getTopRated().subscribe((data) => {
            if (data.results.length) {
                this.defaultItem = data.results[0];
                this.items = data.results;
            }
        });
    }

    changeSlider(e: any) {
        let item = document.querySelectorAll(".owl-item")[e.startPosition + 10]?.getElementsByClassName("film_cat")
        if (item && item[0] instanceof HTMLElement) {
            this.mixSlider.nativeElement.getElementsByClassName('mixed_slider_bg')[0].style.opacity = 0;
            setTimeout(() => {
                this.mixSlider.nativeElement.getElementsByClassName('mixed_slider_bg')[0].style.opacity = 1;
            }, 400);
            this.mixSlider.nativeElement.getElementsByClassName('mixed_slider_bg')[0].src = item[0].dataset['bg']
            // this.mixSlider.nativeElement.getElementsByClassName('mixed_slider_link')[0].src = item[0].dataset['bg']
            this.mixSlider.nativeElement.getElementsByClassName('mixed_slider_title')[0].innerHTML = item[0].dataset['title']
            if (item[0].dataset['imdb']) {
                this.mixSlider.nativeElement.getElementsByClassName('mixed_imdb')[0].style.opacity = 1;
                this.mixSlider.nativeElement.getElementsByClassName('mixed_slider_imdb')[0].innerHTML = item[0].dataset['imdb']
            } else {
                this.mixSlider.nativeElement.getElementsByClassName('mixed_imdb')[0].style.opacity = 0;
            }
        }
    }

}
