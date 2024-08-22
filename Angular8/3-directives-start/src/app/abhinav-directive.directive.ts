import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'appAbhinavDirective'
})
export class AbhinavDirectiveDirective {

  @Input() name:string;
  @Input() age:string;

  constructor() { }

  ngOnInit(){
    console.log('init');
  }
}
