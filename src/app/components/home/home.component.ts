import { Component } from '@angular/core';
import { SliderWidgetComponent } from '../home/slider-widget/slider-widget.component';
import { MovieListWidgetComponent } from '../home/movie-list-widget/movie-list-widget.component';
import { MainSliderComponent } from '../home/main-slider/main-slider.component';
import { MiddleSliderComponent } from '../home/middle-slider/middle-slider.component';
import { GnereSliderComponent } from '../home/gnere-slider/gnere-slider.component';
import { MovieListComponent } from '../home/movie-list/movie-list.component';
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        SliderWidgetComponent, MovieListWidgetComponent, MainSliderComponent, MiddleSliderComponent, GnereSliderComponent, MovieListComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.sass'
})
export class HomeComponent {

}
