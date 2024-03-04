import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.sass'
})
export class NotFoundComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        this.mouseHandler()
    }

    mouseHandler() {
        var pageX = window.innerWidth;
        var pageY = window.innerHeight;
        var mouseY = 0;
        var mouseX = 0;
        document.onmousemove = function (event) {
            mouseY = event.pageY;
            let yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
            yAxis *= -1;
            mouseX = event.pageX / -pageX;
            let xAxis = -mouseX * 90 - 100;
            document.querySelector(".box__ghost-eyes")?.setAttribute('style', `transform:translate(${xAxis}%,${yAxis}%)`);
        };
    }
}
