import { Injectable,EventEmitter } from '@angular/core';
import { LoggingService } from "./logging.service";
import { Subject } from 'rxjs';

@Injectable()
export class AccountsService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];

    constructor(private logSer: LoggingService) { }

    // statusUpdated = new EventEmitter<string>();
    statusUpdated = new Subject<string>();

    onAccountAdded(name: string, status: string) {
        this.accounts.push({ name, status });
        this.logSer.logStatusChanged(status);
    }
    onStatusUpdate(id: number, status: string) {
        this.accounts[id].status = status;
        this.logSer.logStatusChanged(status);
    }
}
