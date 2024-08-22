import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService,AccountsService]
  //providers: [LoggingService]
})
export class AccountComponent implements OnChanges {
  @Input() account: { name: string, status: string };
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{ id: number, newStatus: string }>();

  constructor(private accSer: AccountsService) {
    // console.log(this.accSer.accounts.length);
  }

  ngOnChanges(simple:SimpleChanges){
    console.log("Hello World : " + this.account);
    console.log(simple);
  }

  onSetTo(status: string) {
    // this.statusChanged.emit({ id: this.id, newStatus: status });
    //console.log('A server status changed, new status: ' + status);
    this.accSer.onStatusUpdate(this.id, status);
    //this.logService.logStatusChanged(status);
    // this.accSer.statusUpdated.emit(status);
    this.accSer.statusUpdated.next(status);
  }
}
