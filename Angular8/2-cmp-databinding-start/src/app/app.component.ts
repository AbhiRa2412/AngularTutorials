import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // inputval = 'Hellow';
  serverElements = [{ type: 'server', name: 'TestServer', content: 'Just a test!' }];
  ts = [];

  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  onChangesFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  OnDestroyFirst() {
    this.serverElements.splice(0, 1);
  }

  AddTS() {
    // this.ts = this.ts.concat(new Date().getTime());
    this.ts.push(new Date().getTime());
  }

}
