import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../../services/panel/panel.service';
import { List } from '../../../models/list/list.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-lists',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.sass'
})
export class ListsComponent implements OnInit {
    items: List[] = [];
    constructor(private panelService: PanelService) { }

    ngOnInit(): void {
        this.getLists();
    }

    getLists() {
        this.panelService.getCustomLists().subscribe(q => this.items = q);
    }

    remove(id: number) {
        this.panelService.removeCustomlist(id).subscribe();
    }

}
