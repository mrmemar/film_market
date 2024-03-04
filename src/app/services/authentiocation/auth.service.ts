import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, map, take, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly url = 'https://api.themoviedb.org/3/authentication';
    readonly api_key = "2dd076ac4f075aaffe7234b8153f05ec"
    token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor(
        private http: HttpClient,
        private route: Router,
        private toastr: ToastrService) {
        console.log('loadToken')
        this.loadToken();
    }

    setToken(val: string) {
        this.token.next(val);
        localStorage.setItem("token", val);
    }

    clearToken() {
        this.token.next(null)
        localStorage.removeItem("token");
    }

    loadToken() {
        const token = localStorage.getItem("token");
        if (token) {
            this.token.next(token);
            // this.validateKey().subscribe({
            //     next(value) {
            //         console.log(value)
            //     },
            //     error(err) {
            //         console.log(err)
            //     },
            // });
        }
    }

    isLogin(): boolean {
        if (this.token.getValue()) {
            return true
        }
        return false;
    }

    validateKey(): Observable<boolean> {
        let url = `${this.url}`
        return this.http.get<{ success: boolean }>(url)
            .pipe(
                map(q => q.success),
                catchError(err => {
                    throw err
                })
            );
    }

    login(userLogin: string, passwordLogin: string, handleError: Function): Observable<any> {
        let url: string = `${this.url}/token/new?api_key=${this.api_key}`
        return this.http.get<{ request_token: string, success: boolean }>(url).pipe(
            tap(q => {
                if (q.success) {
                    this.validLogin(userLogin, passwordLogin, q.request_token, handleError).subscribe();
                }
            })
        )
    }

    validLogin(userLogin: string, passwordLogin: string, request_token: string, handleError: Function): Observable<any> {
        let url = `${this.url}/token/validate_with_login?api_key=${this.api_key}`
        let body = {
            username: userLogin,
            password: passwordLogin,
            request_token: request_token
        };
        return this.http.post<{ success: boolean, request_token: string }>(url, body)
            .pipe(
                catchError(e => {
                    this.toastr.error("نام کاربری یا کلمه عبور صحیح نمی باشد.", "هشدار")
                    console.log(handleError)
                    handleError();
                    throw e;
                }),
                tap(q => {
                    if (q.success) {
                        this.createSession(q.request_token).subscribe();
                    }
                }),
            );
    }

    createSession(request_token: string): Observable<any> {
        let url = `${this.url}/session/new?api_key=${this.api_key}`;
        let body = { request_token: request_token }
        return this.http.post<{ success: boolean, session_id: string }>(`${url}`, body)
            .pipe(
                catchError(err => {
                    throw err;
                }),
                tap(q => {
                    if (q.success) {
                        this.toastr.success("در حال انتقال به پنل کاربری", "خوش آمدید")
                        this.setToken(q.session_id);
                        this.loadToken();
                        this.route.navigate(["panel"]);
                    }
                }),
            );
    }

    logout(): Observable<any> {
        let url = `${this.url}/session?api_key=${this.api_key}`
        let body = { session_id: this.token.getValue() };
        return this.http.delete<{ success: boolean }>(url, { body }).pipe(
            tap(q => {
                if (q.success) {
                    this.clearToken();
                    this.route.navigate(["login"])
                }
            })
        )

    }

}
