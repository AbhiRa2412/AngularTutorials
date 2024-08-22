import { Directive, OnInit, ElementRef } from "@angular/core";

@Directive({
    selector: '[appBasicHighLight]',
})

export class BasicHighlightDirective implements OnInit {
    
    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = "blue";
        this.elementRef.nativeElement.style.color = "white";
    }
}