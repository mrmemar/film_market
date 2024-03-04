import { Component, Input } from '@angular/core';
import { MenuItem } from '../../models/menu-items/menu-item.model';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.sass'
})
export class FooterComponent {
    @Input() title: string = "";
    @Input() logo: string = "";
    links1: Array<MenuItem> = [];
    links2: Array<MenuItem> = [];
    constructor() {
        this.links1 = [{
            id: 1, code: "", title: "تست 1", link: ""
        }, {
            id: 2, code: "", title: "تست 2", link: ""
        }, {
            id: 3, code: "", title: "تست 3", link: ""
        }, {
            id: 4, code: "", title: "تست 4", link: ""
        }];
        this.links2 = [{
            id: 1, code: "", title: "تست 1", link: ""
        }, {
            id: 2, code: "", title: "تست 2", link: ""
        }, {
            id: 3, code: "", title: "تست 3", link: ""
        }, {
            id: 4, code: "", title: "تست 4", link: ""
        }];
    }
}
