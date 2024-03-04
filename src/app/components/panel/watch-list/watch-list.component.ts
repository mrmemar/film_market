import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie } from '../../../models/movie/movie.model';
import { ToastrService } from 'ngx-toastr';
import { PanelService } from '../../../services/panel/panel.service';

@Component({
    selector: 'app-watch-list',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './watch-list.component.html',
    styleUrl: './watch-list.component.sass'
})
export class WatchListComponent implements OnInit {
    items: Movie[] = [];
    constructor(private route: ActivatedRoute, private panelService: PanelService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.getWatchlist();
    }

    getWatchlist() {
        this.route.parent?.data.subscribe(q => this.items = q['watchlist']);
    }

    removeWatchlist(id: number) {
        this.panelService.toggleWatchlist(id, false).subscribe(q => {
            if (q.success) {
                this.toastr.success(q.status_message, 'Dear User');
                this.panelService.getWachList().subscribe(q => {
                    this.route.parent?.data.subscribe(r => {
                        r['watchlist'] = q;
                        this.items = q;
                    });
                })
            }

        });

    }
}
