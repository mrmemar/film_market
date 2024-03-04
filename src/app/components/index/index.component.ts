import { Component, Input } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-index',
    standalone: true,
    imports: [HeaderComponent, FooterComponent, RouterOutlet],
    templateUrl: './index.component.html',
    styleUrl: './index.component.sass'
})
export class IndexComponent {
    title: string = 'فیلم مارکت';
    logo: string = 'https://cdn.sqp.ir/Templates/FilmMarket/assets/img/logo.png'
}
