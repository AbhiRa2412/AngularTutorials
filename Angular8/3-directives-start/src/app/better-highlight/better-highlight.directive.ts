import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  @Input() defaultBGColor = "black";
  @Input() highlightBGColor = "blue";
  // @Input() defaultColor = "yellow";
  @Input('appBetterHighlight') defaultColor = "yellow";
  @Input() highlightColor = "white";
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.color') color: string;

  ngOnInit() {
    //  this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'yellow');
    this.backgroundColor = this.defaultBGColor;
    this.color = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'yellow');
    // this.backgroundColor = 'blue';
    // this.color = 'yellow';
    this.backgroundColor = this.highlightBGColor;
    this.color = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'white');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
    // this.backgroundColor = 'white';
    // this.color = 'black';
    this.backgroundColor = this.defaultBGColor
    this.color = this.defaultColor;
  }

}
