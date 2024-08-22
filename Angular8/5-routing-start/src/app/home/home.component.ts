import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck {

  loggedIn = false;
  constructor(private router: Router, private authSer: AuthService) { }

  ngDoCheck() {
    this.loggedIn = this.authSer.loggedIn
  }

  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'],
      { queryParams: { allowEdit: 1 }, fragment: 'loading' }
    );
  }

  onLogIn() {
    this.authSer.logIn();
  }

  onLogOut() {
    this.authSer.logOut();
  }

}
