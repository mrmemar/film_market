import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-paging',
    standalone: true,
    imports: [],
    templateUrl: './paging.component.html',
    styleUrl: './paging.component.sass'
})
export class PagingComponent {
    @Input() activePage: number = 0;
    @Input() pageCount: number = 0;
    @Output('changePage') changePage = new EventEmitter();
    pagers: any[] = [];
    counter: number = 3;
    paging: number[] = [];

    _changePage(newPage: number) {
        this.changePage.emit(newPage);
    }




}
