import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { GenreService } from '../../../services/genre/genre.service';
import { Genre } from '../../../models/genre/genre.model';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-gnere-slider',
    standalone: true,
    imports: [CarouselModule, RouterLink],
    templateUrl: './gnere-slider.component.html',
    styleUrl: './gnere-slider.component.sass'
})
export class GnereSliderComponent implements OnInit {
    @Input() title: string = "";
    options: OwlOptions;
    items: Array<Genre> = [];

    constructor(private genreService: GenreService) {
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
                0: { items: 1, },
                600: { items: 3, },
                1000: { items: 4, }
            }
        }
    }

    ngOnInit(): void {
        this.getGeners();
    }

    getGeners() {
        this.genreService.getAll().subscribe(q => this.items = q);
    }

}
