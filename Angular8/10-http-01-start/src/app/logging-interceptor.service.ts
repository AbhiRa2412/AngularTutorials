import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Outgoing Request');
        console.log(req.url);
        console.log(req.headers);
        return next.handle(req).pipe(tap(event=>{
            console.log('Incoming Response'); 
            console.log(event);
            if(event.type === HttpEventType.Response){
                console.log('Response body Arrived');
                console.log(event.body);
            }
        }));
    }
}