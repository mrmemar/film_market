import { AfterViewInit, Component, Input, OnInit, ViewChild, } from '@angular/core';
import { OwlOptions, CarouselModule, CarouselComponent } from 'ngx-owl-carousel-o'
import { Movie } from '../../../models/movie/movie.model';
import { Cast } from '../../../models/cast/cast.model';
import { MovieService } from '../../../services/movie/movie.service';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-informations',
    standalone: true,
    imports: [CarouselModule, RouterLink],
    templateUrl: './informations.component.html',
    styleUrl: './informations.component.sass',

})
export class InformationsComponent implements OnInit, AfterViewInit {
    @Input() 'id': number = 0;
    @Input() 'item': Movie = {} as Movie;
    casts: Array<Cast> = [];
    keywords: Array<{ id: number, name: string }> = [];
    options: OwlOptions = {};
    informations: Array<keyof Movie>;
    activeHeader: boolean = true;
    constructor(private movieService: MovieService) {
        // this.carousel.carouselLoaded
        this.informations = [
            "genres",
            "production_companies",
            "production_countries",
            "budget",
            "revenue",
            "spoken_languages",
            "status",
            "release_date",
        ];
        this.options = {
            autoWidth: false,
            items: 10,
            skip_validateItems: true,
            margin: 24,
            rtl: true,
            loop: false,
            autoplay: false,
            nav: true,
            navText: ["<div class='slider_actions'><i class='fa fa-chevron-right'></i></div>", "<div class='slider_actions'><i class='fa fa-chevron-left'></i></div>"],
            dots: false,
            responsive: { 0: { items: 3 }, 600: { items: 6 }, 1000: { items: 8 } }
        }
    }

    ngOnInit(): void {
        this.getCasts();
        this.getKeyowrds();
    }

    ngAfterViewInit(): void {

    }

    getCasts() {
        this.movieService.getCredits(this.id).subscribe(q => {
            this.casts = q.cast;
        });
    }

    getKeyowrds() {
        this.movieService.getKeywords(this.id).subscribe(q => this.keywords = q);
    }

    get(info: keyof Movie): any {
        return this.item[info]
    }

    getType(value: any): string {
        return typeof value;
    }

}
