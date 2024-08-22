import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges,
  DoCheck,
  AfterViewInit,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // encapsulation:ViewEncapsulation.None,  //this component style to be applied globally
  encapsulation: ViewEncapsulation.Emulated //mostly used for making style to be applied to their own component only
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ServerElementComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  // @Input() element: { type: string, name: string, content: string };
  // Here srvElement is an alias in place of element
  @Input('srvElement') element: { type: string, name: string, content: string };
  @Input() name: string;
  // @Input() inputValu:string;
  @ViewChild('heading', { static: true }) heading: ElementRef;
  @ContentChild('paragraphContent', { static: true }) paragraphContent: ElementRef;

  constructor() {
    console.log('Constructor Called!');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges Called!');
    console.log(changes);
    console.log(this.element);
  }

  ngOnInit(): void {
    console.log('ngOnInit Called!');
    console.log(`This is heading called  ${this.heading.nativeElement.textContent}`);
    console.log(`This is textcontent  ${this.paragraphContent.nativeElement.textContent}`);
  }

  ngDoCheck() {
    console.log('ngDoCheck Called!');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit Called!');
    console.log(`This is textcontent  ${this.paragraphContent.nativeElement.textContent}`);
  }
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked Called!');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit Called!');
    console.log(`This is ngAfterViewInit called  ${this.heading.nativeElement.textContent}`);
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked Called!');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy Called!');
  }

}
