import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PanelService } from '../../../../services/panel/panel.service';
import { List } from '../../../../models/list/list.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map, switchMap } from 'rxjs';
import { MovieService } from '../../../../services/movie/movie.service';
import { Movie } from '../../../../models/movie/movie.model';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-edit-list',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, NgStyle],
    templateUrl: './edit-list.component.html',
    styleUrl: './edit-list.component.sass'
})
export class EditListComponent implements OnInit, AfterViewInit {
    id: number = 0;
    item: List = {} as List;
    editForm: FormGroup = {} as FormGroup;
    searchTitle: string = "";
    suggectItems: Movie[] = [];
    suggectShow: boolean = false;
    @ViewChild("panel_search_keyword") panel_search_keyword: ElementRef = {} as ElementRef
    constructor(
        private panelService: PanelService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private mavieS: MovieService
    ) { }


    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.createForm()
        this.getData()
    }

    ngAfterViewInit(): void {
        this.eventHandler();
        this.searchHandler();
    }

    createForm() {
        this.editForm = this.formBuilder.group({
            name: ["", Validators.required],
            description: ["", Validators.required]
        })
    }

    getData() {
        this.panelService.getCustomList(this.id).subscribe(q => {
            this.item = q
            this.editForm.patchValue(q)
        });
    }

    addMovie(movieId: number) {
        this.panelService.addMovie(this.id, movieId).subscribe(q => { this.getData(); })
    }

    removeMovie(movieId: number) {
        this.panelService.removeMovie(this.id, movieId).subscribe(q => { this.getData() });
    }

    searchHandler() {
        fromEvent(this.panel_search_keyword.nativeElement, "keyup").pipe(
            map((event: any) => event.target.value),
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap(q => {
                this.suggectShow = true;
                this.searchTitle = q
                return this.mavieS.search(q)
            })
        ).subscribe(q => this.suggectItems = q);
    }

    eventHandler() {
        document.addEventListener("click", (e: any) => {
            this.suggectShow = false;
        });
        this.panel_search_keyword.nativeElement.addEventListener("focus", (e: any) => {
            this.suggectShow = true;
        })
    }
}
