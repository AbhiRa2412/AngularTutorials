import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subject, BehaviorSubject, ReplaySubject, Subscription, Observable, timer, observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  firstObjSubscription: Subscription;
  // secondObjSubscription: Subscription;

  bSubject = new BehaviorSubject("a");
  rSubject = new ReplaySubject(0, 2000);
  subject = new Subject();

  observable1 = interval(300);
  observable2 = interval(400);

  parentSubscription = this.observable1.subscribe(data1 => console.log(`First: ${data1}`));
  childSubscription = this.observable2.subscribe(data2 => console.log(`Second: ${data2}`));



  constructor() { }

  ngOnInit() {

    // this.firstObjSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    //Observable and observer
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });


    //observer
    //An observer is a plain JavaScript object that contains methods such as next(), complete() and error().
    // This means it knows how to get notified by the Observable.
    this.firstObjSubscription = customIntervalObservable.pipe(filter((data) => {
      return data > 0;
    }), map((data: number) => {
      return 'Round ' + (data + 1);
    })).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Complete!');
    });

    const source = timer(1000, 2000);
    const subscribe = source.subscribe(data => { console.log("Second Obj " + data) });
    // this.secondObjSubscription = source.pipe(filter((data) => {
    //   return data > 0;
    // }), map((data) => {
    //   return "Round " + (data + 1);
    // })).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log('error')
    // }, () => {
    //   console.log("Second Obj Complete");
    // });

    setTimeout(() => { subscribe.unsubscribe() }, 5000);

    this.observableDemo();
  }

  observableDemo() {
    this.bSubject.next("bSubject b");
    this.bSubject.subscribe(value => {
      console.log("Subscription got", value); // Subscription got b, ^ This would not happen
      // for a generic observable  or generic subject by default
    });
    this.bSubject.next("bSubject c"); // Subscription got c
    this.bSubject.next("bSubject d");


    this.subject.next("bSubject b");
    this.subject.subscribe(value => {
      console.log("Subscription got", value); // Subscription wont get
      // anything at this point
    });

    this.subject.next("Subject c"); // Subscription got c
    this.subject.next("Subject d"); // Subscription got d

    this.rSubject.subscribe(value => {
      console.log('Hello');
    });
    this.rSubject.next('Hey');

    this.parentSubscription.add(this.childSubscription);

    setTimeout(() => {
      this.parentSubscription.unsubscribe();
    }, 1000);

  }

  ngOnDestroy() {
    this.firstObjSubscription.unsubscribe();
    // this.secondObjSubscription.unsubscribe();
  }

}
