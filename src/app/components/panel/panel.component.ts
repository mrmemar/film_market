import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from '../../models/menu-items/menu-item.model';
import { Movie } from '../../models/movie/movie.model';
import { ThemeService } from '../../services/theme/theme.service';
import { AuthService } from '../../services/authentiocation/auth.service';
import { Profile } from '../../models/profile/profile.model';
import { PanelService } from '../../services/panel/panel.service';


@Component({
    selector: 'app-panel',
    standalone: true,
    imports: [RouterLink, RouterOutlet, RouterLinkActive],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.sass'
})
export class PanelComponent implements OnInit {
    @ViewChildren('subMenu') subMenu: QueryList<any> = {} as QueryList<any>;
    title: string = 'فیلم مارکت';
    logo: string = 'https://cdn.sqp.ir/Templates/FilmMarket/assets/img/logo.png'
    menuItems: Array<MenuItem> = [];
    profile: Profile = {} as Profile;
    constructor(private themeService: ThemeService, private panelService: PanelService) {
        this.menuItems = [
            { id: 1, link: "dashboard", code: "dashboard", title: "داشبورد", icon: "objects-column" },
            // { id: 1, link: "vip", code: "vip", title: "اشتراک ویژه", icon: "gem" },
            {
                id: 1, link: "ticket", code: "ticket", title: "تیکت های پشتیبانی", icon: "ticket", children: [
                    { id: 1, link: "ticket/tickets", code: "tickets", title: "تیکت ها", icon: "ticket" },
                    { id: 1, link: "ticket/add_ticket", code: "add_ticket", title: "تیکت جدید", icon: "circle-plus" },
                ]
            },
            { id: 1, link: "watchlist", code: "watchlist", title: "لیست تماشا", icon: "bookmark" },
            { id: 1, link: "lists", code: "lists", title: "لیست های سفارشی", icon: "list" },
            { id: 1, link: "req", code: "req", title: "درخواست فیلم و سریال", icon: "film" },
            // { id: 1, link: "notifs", code: "notifs", title: "اعلانات", icon: "bell" },
            { id: 1, link: "editprofile", code: "editprofile", title: "ویرایش پروفایل", icon: "pencil" },
            // { id: 1, link: "comments", code: "comments", title: "دیدگاه های شما", icon: "comments" },
            { id: 1, link: "exit", code: "exit", title: "خروج از حساب کاربری", icon: "arrow-right-from-bracket" },
        ];
    }
    ngOnInit(): void {
        this.getProfile();
        // const panel_submenu = $(".nav_panel .sub-menu").hide();
        // $(".nav_panel li.active .sub-menu").show();
        // $(".nav_panel li > a").click(function (e) {
        //     if ($(this).next().is("ul")) {
        //         e.preventDefault();
        //         if ($(this).parent().hasClass("child-minus")) {
        //             $(this).parent().removeClass("child-minus"); $(this).next().slideUp("500");
        //         } else {
        //             panel_submenu.slideUp("500");
        //             $(".float_menu li").removeClass("child-minus");
        //             $(this).parent().addClass("child-minus"); $(this).next().slideDown("500");
        //         }
        //         return false;
        //     }
        // });
    }
    ngAfterViewInit() {
        this.setTheme()
        this.subMenu.forEach(item => {
            // item.nativeElement.style.display = "none";
            // item.nativeElement.style.display = "none";
        })

    }

    setTheme() {
        this.themeService.setTheme();
    }

    getProfile() {
        this.panelService.getProfile().subscribe(q => this.profile = q)
    }
}
