import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // console.log('Request on it\'s way');
        // return next.handle(req);
               
        const modifiedHeader = req.clone({
            headers: req.headers.append('auth', 'xyz')
        });
        return next.handle(modifiedHeader);
    }
}