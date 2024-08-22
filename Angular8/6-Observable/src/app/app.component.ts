import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  subjSubscription: Subscription
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subjSubscription = this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    })
  }




  ngOnDestroy() {
    this.subjSubscription.unsubscribe();
  }
}
