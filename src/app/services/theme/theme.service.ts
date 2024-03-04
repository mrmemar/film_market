import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    isDark: boolean;
    constructor() {
        this.isDark = (localStorage.getItem("isDark") == "true") ? true : false;
    }

    setTheme(toggleButton?: ElementRef) {
        const body = document.querySelector('html') as HTMLHtmlElement;
        const isDark = this.isDark;
        localStorage.setItem("isDark", isDark.toString());
        if (toggleButton) {
            toggleButton.nativeElement.classList.toggle("fa-moon", !isDark);
            toggleButton.nativeElement.classList.toggle("fa-sun", isDark);
        }
        body.classList.toggle("dark", !isDark);
    }

    changeTheme(toggleButton: ElementRef) {
        this.isDark = !this.isDark;
        this.setTheme(toggleButton)
    }
}
