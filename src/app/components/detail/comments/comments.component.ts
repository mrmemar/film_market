import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../../models/review/review.model';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
    selector: 'app-comments',
    standalone: true,
    imports: [],
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.sass'
})
export class CommentsComponent implements OnInit {
    @Input() id: number = 0;
    items: Array<Review> = [];
    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.getComments();
    }

    getComments() {
        this.movieService.getRiviews(this.id).subscribe(q => this.items = q);
    }
}
