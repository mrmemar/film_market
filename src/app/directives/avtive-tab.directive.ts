import { Directive, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appAvtiveTab]',
    standalone: true
})
export class AvtiveTabDirective implements AfterViewInit, OnChanges {
    @Input() appAvtiveTab: string = '';
    constructor(private el: ElementRef) {
    }
    ngAfterViewInit(): void {
        if (this.el.nativeElement.id == this.appAvtiveTab) {
            this.el.nativeElement.classList.add("active", "show");
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['appAvtiveTab'].previousValue) {
            this.el.nativeElement.children[changes['appAvtiveTab'].previousValue].classList.remove("active", "show")
        }
        if (changes['appAvtiveTab'].currentValue) {
            this.el.nativeElement.children[changes['appAvtiveTab'].currentValue].classList.add("active", "show")
        }

    }



}
