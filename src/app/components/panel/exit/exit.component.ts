import { Component } from '@angular/core';
import { AuthService } from '../../../services/authentiocation/auth.service';

@Component({
    selector: 'app-exit',
    standalone: true,
    imports: [],
    templateUrl: './exit.component.html',
    styleUrl: './exit.component.sass'
})
export class ExitComponent {
    constructor(private authService: AuthService) {
        this.logout();
    }

    logout() {
        this.authService.logout().subscribe();
    }
}
