import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  // @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  // Used alias same as in @Input directive
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  //newServerName = '';
  //newServerContent = '';
  @ViewChild('inputServerContent', { static: true }) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  // onAddServer() {
  //   this.serverCreated.emit({ serverName: this.newServerName, serverContent: this.newServerContent });
  // }

  // onAddBlueprint() {
  //   this.blueprintCreated.emit({ serverName:this.newServerName, serverContent: this.newServerContent });
  // }


  onAddServer(inputServerName: HTMLInputElement) {
    // console.log(this.serverContentInput);
    this.serverCreated.emit({ serverName: inputServerName.value, serverContent: this.serverContentInput.nativeElement.value });
  }

  onAddBlueprint(inputServerName: HTMLInputElement) {
    this.blueprintCreated.emit({ serverName: inputServerName.value, serverContent: this.serverContentInput.nativeElement.value });
  }

}
