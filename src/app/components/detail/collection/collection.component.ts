import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Collection } from '../../../models/collection/collection.model';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.sass'
})
export class CollectionComponent {
    @Input() id: number = 0;
    item: Collection = {} as Collection;
    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.getCollections()
    }

    getCollections() {
        this.movieService.collection(this.id).subscribe(q => this.item = q);
    }
}
