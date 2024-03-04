import { Component, ElementRef, OnInit, ViewChild, effect } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie/movie.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AvtiveTabDirective } from '../../directives/avtive-tab.directive';
import { RelatedsComponent } from '../relateds/relateds.component';
import { InformationsComponent } from './informations/informations.component';
import { FaqComponent } from './faq/faq.component';
import { CollectionComponent } from './collection/collection.component';
import { CommentsComponent } from './comments/comments.component';
import { PanelService } from '../../services/panel/panel.service';
@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [AvtiveTabDirective, RelatedsComponent, InformationsComponent,
        FaqComponent, CollectionComponent, CommentsComponent, RouterLink],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.sass'
})
export class DetailComponent implements OnInit {
    id: number = 0;
    item: Movie = {} as Movie;
    activeTab: string = "informations";
    tabs: Array<any> = [];
    isMarked: boolean = false;
    isLoading: boolean = false;
    disabled: boolean = false;
    @ViewChild('pillsTabContent') pills: ElementRef = {} as ElementRef;

    constructor(private movieService: MovieService, private route: ActivatedRoute, private panelService: PanelService) {
        this.tabs = [
            { id: "informations-tab", target: "informations", title: "اطلاعات بیشتر", icon: "info-square" },
            { id: "dl-tab", target: "dl", title: "دانلود باکس", icon: "download" },
            { id: "lists-tab", target: "lists", title: "لیست های مرتبط", icon: "list-alt" },
            { id: "comments-tab", target: "comments", title: "نظرات", icon: "comments" },
            { id: "testimontial-tab", target: "testimontial", title: "سوالات متداول", icon: "question-square" },
        ];

    }

    ngOnInit(): void {
        document.getElementsByClassName("header")[0].classList.add("header-single");
        this.id = this.route.snapshot.params["id"];
        this.getMovie(this.id);
    }

    getMovie(id: number) {
        this.movieService.get(id).subscribe({
            next: (q) => {
                this.item = q
            }, complete: () => {
                this.panelService.isMarked(this.id).subscribe(q => {
                    this.isMarked = q;
                });
            }
        });
    }

    changeTab(target: string): void {
        this.activeTab = target;
    }

    toggleWatchlist(id: number) {
        if (!this.disabled) {
            this.disabled = true;
            this.isLoading = true;
            if (this.isMarked) {
                this.panelService.toggleWatchlist(id, false).subscribe(q => {
                    this.isMarked = !this.isMarked;
                    this.isLoading = false;
                    this.disabled = false;
                });
            } else {
                this.panelService.toggleWatchlist(id, true).subscribe(q => {
                    this.isMarked = !this.isMarked;
                    this.isLoading = false;
                    this.disabled = false;
                });
            }
        }

    }

}
