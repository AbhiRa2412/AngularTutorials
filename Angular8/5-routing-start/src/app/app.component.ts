import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  login = false;
  constructor(private auth: AuthService) { }

  ngDoCheck() {
    this.login = this.auth.loggedIn;
  }
}
