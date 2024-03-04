import { Component, OnInit } from '@angular/core';
import { List } from '../../../../models/list/list.model';
import { PanelService } from '../../../../services/panel/panel.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-show-list',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './show-list.component.html',
    styleUrl: './show-list.component.sass'
})
export class ShowListComponent implements OnInit {
    item: List = {} as List
    id: number;

    constructor(private panelService: PanelService, private route: ActivatedRoute) {
        this.id = route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.panelService.getCustomList(this.id).subscribe(q => this.item = q);
    }
}
