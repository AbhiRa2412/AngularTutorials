import { Component, QueryList, ContentChildren } from "@angular/core";
import { AbhinavDirectiveDirective } from "./abhinav-directive.directive";

@Component({
    selector: 'abhinav',
    template: `
    <div *ngFor="let currabhi of abhiDir">
    Name: {{currabhi.name}}<br/>
    Age:{{currabhi.age}}
    </div>
    `
})

export class AbhinavComponent {
    @ContentChildren(AbhinavDirectiveDirective) abhiDir:QueryList<AbhinavDirectiveDirective>;

}