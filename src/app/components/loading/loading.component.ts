import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.sass'
})
export class LoadingComponent {
    @Input() isLoading: boolean = true;
    readonly loading: string = "https://cdn.sqp.ir/Templates/4/img/preloader.svg"
}
