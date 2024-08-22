import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService, AccountsService]
  //providers: [LoggingService]
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();

  constructor(private logService: LoggingService, private accser: AccountsService) {
    this.accser.statusUpdated.subscribe(
      (status: string) => alert(`New Staus : ${status}`)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    this.accser.onAccountAdded(accountName, accountStatus);
    //this.logService.logStatusChanged(accountStatus);
    // const service = new LoggingService();
    // service.logStatusChanged(accountStatus);
    // console.log('A server status changed, new status: ' + accountStatus);
  }
}
