import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie/movie.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SliderWidgetComponent } from '../home/slider-widget/slider-widget.component';
import { MovieListWidgetComponent } from '../home/movie-list-widget/movie-list-widget.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { PagingComponent } from '../home/paging/paging.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [RouterLink, SliderWidgetComponent, MovieListWidgetComponent, BreadcrumbComponent
        , PagingComponent, LoadingComponent],
    templateUrl: './list.component.html',
    styleUrl: './list.component.sass'
})
export class ListComponent implements OnInit {
    items: Movie[] = [];
    pageCount: number = 0;
    activePage: number = 0;
    gernreId: number = 0;
    keyword: string = '';
    isLoaing: boolean = true;
    constructor(private movieService: MovieService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(data => {
            this.gernreId = data['genre'];
            this.keyword = data['keyword'];
        })
    }
    ngOnInit(): void {
        document.getElementsByClassName("header")[0].classList.remove("header-single");
        this.getMovies(this.gernreId, this.keyword);
    }

    getMovies(genreId: number, keyword: string) {
        let options = {
            with_genres: genreId,
            with_keywords: keyword
        }
        this.movieService.getList(options).subscribe(q => {
            this.items = q.results;
            this.pageCount = q.total_pages;
            this.activePage = q.page;
            this.isLoaing = q.isLoading
        });
    }

    changePage(page: number) {
        this.movieService.getList({ page, with_genres: this.gernreId, with_keywords: this.keyword }).subscribe(q => {
            this.items = q.results;
            this.pageCount = q.total_pages;
            this.activePage = q.page;
        });
    }
}
