import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // title = 'my-recipie-app';
  // loadedFeature = 'recipe';
  // onNavigation(feature: string) {
  //   this.loadedFeature = feature;
  // }

  constructor(private authSer:AuthService,private logSer:LoggingService){}

  ngOnInit(){
    this.authSer.autoLogin();
    this.logSer.printLog('Hello from App Component in ngOnInit');
  }
}
