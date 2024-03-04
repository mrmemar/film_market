import { AfterViewInit, Component, ComponentRef, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/authentiocation/auth.service';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit, AfterViewInit {
    title: string = 'فیلم مارکت';
    logo: string = 'https://cdn.sqp.ir/Templates/FilmMarket/assets/img/logo.png'
    loginForm: FormGroup = {} as FormGroup;
    disabled: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
    ) { }


    ngAfterViewInit(): void {
        if (this.loginForm.invalid) {
            this.disabled = true;
        }
    }

    ngOnInit(): void {
        this.createFrom()
    }

    createFrom() {
        this.loginForm = this.formBuilder.group({
            userLogin: ['memar', Validators.required],
            passwordLogin: ['Juventus10', Validators.required]
        });
    }

    handleError() {
        this.disabled = false;
    }

    login() {
        this.disabled = true;
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value.userLogin, this.loginForm.value.passwordLogin, this.handleError.bind(this))
                .subscribe();
        }
    }


}
