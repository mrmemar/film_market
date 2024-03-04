import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../models/movie/movie.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'
@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CarouselModule, RouterLink],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.sass'
})
export class DashboardComponent implements OnInit {
    items: Movie[] = [];
    options: OwlOptions;
    constructor(private route: ActivatedRoute) {
        this.options = {
            autoWidth: true,
            items: 10,
            skip_validateItems: true,
            margin: 20,
            rtl: true,
            loop: false,
            autoplay: false,
            nav: false,
            navText: ["<div class='slider_actions'><i class='fa fa-chevron-right'></i></div>", "<div class='slider_actions'><i class='fa fa-chevron-left'></i></div>"],
            dots: true,
            responsive: { 0: { items: 2 }, 600: { items: 5 }, 1200: { items: 8 }, 1600: { items: 10 } }
        };
    }
    ngOnInit(): void {
        this.getWatchlist();
    }

    getWatchlist() {
        this.route.parent?.data.subscribe(q => this.items = q['watchlist']);
    }

}
