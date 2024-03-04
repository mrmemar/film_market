import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie/movie.model';
import { PanelService } from '../services/panel/panel.service';

export const watchListResolver: ResolveFn<Observable<Movie[]>> = (route, state) => {
    const panelService = inject(PanelService);
    return panelService.getWachList();
};
