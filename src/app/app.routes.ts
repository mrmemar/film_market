import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { PanelComponent } from './components/panel/panel.component';
import { DashboardComponent } from './components/panel/dashboard/dashboard.component';
import { VipComponent } from './components/panel/vip/vip.component';
import { TicketsComponent } from './components/panel/tickets/tickets.component';
import { WatchListComponent } from './components/panel/watch-list/watch-list.component';
import { ListsComponent } from './components/panel/lists/lists.component';
import { ReqComponent } from './components/panel/req/req.component';
import { NotifsComponent } from './components/panel/notifs/notifs.component';
import { EditProfileComponent } from './components/panel/edit-profile/edit-profile.component';
import { CommentsComponent } from './components/panel/comments/comments.component';
import { AddTicketComponent } from './components/panel/add-ticket/add-ticket.component';
import { IndexComponent } from './components/index/index.component';
import { watchListResolver } from './resolve/watch-list.resolver';
import { ListComponent } from './components/list/list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './gaurd/auth.guard';
import { ExitComponent } from './components/panel/exit/exit.component';
import { CreateListComponent } from './components/panel/lists/create-list/create-list.component';
import { EditListComponent } from './components/panel/lists/edit-list/edit-list.component';
import { ShowListComponent } from './components/panel/lists/show-list/show-list.component';
import { loginGuard } from './gaurd/login.guard';

export const routes: Routes = [
    {
        path: "",
        component: IndexComponent,
        children: [
            { path: "", redirectTo: 'home', pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "detail/:id/:title", component: DetailComponent },
            { path: "list", component: ListComponent },
            { path: "list/:id/:title", component: ListComponent },
        ]
    },
    { path: "login", component: LoginComponent, canActivate: [loginGuard] },
    {
        path: "panel",
        component: PanelComponent,
        resolve: { watchlist: watchListResolver },
        canActivate: [authGuard],
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: 'full' },
            { path: "dashboard", component: DashboardComponent },
            { path: "vip", component: VipComponent },
            {
                path: "ticket", children: [
                    { path: "", component: TicketsComponent },
                    { path: "tickets", component: TicketsComponent },
                    { path: "add_ticket", component: AddTicketComponent },
                ]
            },
            { path: "watchlist", component: WatchListComponent },
            {
                path: "lists", children: [
                    { path: "", component: ListsComponent },
                    { path: "create", component: CreateListComponent },
                    { path: "edit/:id", component: EditListComponent },
                    { path: "show/:id", component: ShowListComponent },
                ]
            },
            { path: "req", component: ReqComponent },
            { path: "notifs", component: NotifsComponent },
            { path: "editprofile", component: EditProfileComponent },
            { path: "comments", component: CommentsComponent },
            { path: "exit", component: ExitComponent },
        ]
    },
    { path: "**", component: NotFoundComponent }
];
