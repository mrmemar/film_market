import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from '../../models/menu-items/menu-item.model';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/authentiocation/auth.service';
import { Movie } from '../../models/movie/movie.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map, switchMap } from 'rxjs';
import { MovieService } from '../../services/movie/movie.service';
import { JsonPipe } from '@angular/common';
import { PanelService } from '../../services/panel/panel.service';
import { Profile } from '../../models/profile/profile.model';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, JsonPipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.sass'
})
export class HeaderComponent implements OnInit, AfterViewInit {
    @Input() title: string = '';
    @Input() logo: string = '';
    @ViewChild("dark_toggle") dark_toggle: ElementRef = {} as ElementRef
    @ViewChild("searchInput") searchInput: ElementRef = {} as ElementRef
    // isDark: boolean = (localStorage.getItem("isDark") == "true") ? true : false;
    searchModal: boolean = false;
    activePanel: boolean = false;
    menuItems: Array<MenuItem>;
    isLogin: boolean;
    suggest: string = "";
    suggestItems: Array<Movie> = [];
    searchForm: FormGroup = {} as FormGroup;
    profile: Profile = {} as Profile;
    constructor(
        private themeService: ThemeService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private movieService: MovieService,
        private panelService: PanelService
    ) {

        this.isLogin = this.authService.isLogin()

        this.menuItems = [
            { id: 1, code: "home", title: "خانه", link: "/home" },
            {
                id: 2, code: "cinema", title: "لیست فیلم\u200cها", link: "/list"
            },
        ]

    }

    ngOnInit(): void {
        this.createForm();
        if (this.isLogin) {
            this.getProfile();
        }
    }

    ngAfterViewInit(): void {
        this.setTheme();
        this.searchListener();
    }

    setTheme() {
        this.themeService.setTheme(this.dark_toggle);
    }

    changeTheme() {
        this.themeService.changeTheme(this.dark_toggle);
    }

    createForm() {
        this.searchForm = this.formBuilder.group({
            searchInput: ["", Validators.required]
        });
    }

    getProfile() {
        this.panelService.getProfile().subscribe(q => this.profile = q);
    }



    toggleSearch() {
        this.searchModal = !this.searchModal
    }

    searchListener() {
        fromEvent(this.searchInput.nativeElement, "keyup").pipe(
            map((event: any) => event.target.value),
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap(search => {
                this.suggest = search;
                return this.movieService.search(search);
            })
        ).subscribe(q => this.suggestItems = q);
    }
}
