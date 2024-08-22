import { Directive, HostListener, HostBinding,ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]',
})

export class DropdownDirective {

    @HostBinding('class.open') isOpen = false; //will add class to element if isOpen = true
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }

      constructor(private elRef: ElementRef) {}

    // @HostListener('click') toggleClass() {
    //    this.isOpen = !this.isOpen
    // }

}