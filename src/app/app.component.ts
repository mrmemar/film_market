import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SymbolComponent } from './components/symbol/symbol.component';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SymbolComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent {
    title: string = 'فیلم مارکت';
    logo: string = 'https://cdn.sqp.ir/Templates/FilmMarket/assets/img/logo.png'
}
