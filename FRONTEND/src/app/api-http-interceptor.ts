import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { UserState } from "./userState";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor
{
    jwtToken : String = "";

    constructor(private router: Router, private store: Store) {
        this.store.select(UserState.getTokenJwt).subscribe(jwt =>
            {
              this.jwtToken = jwt;
            });
    }
       
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.jwtToken}`
          },
        });
    
        return next.handle(request).pipe(tap(
            (evt: HttpEvent<any>) => {},
            (error: HttpErrorResponse) => {
            switch (error.status) {
                case 400:
                case 401:
                    this.router.navigate(['/']);
            }
            return of(null);
        }
        ));
    }

    /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.jwtToken != "") {
            req = req.clone({ 
                setHeaders: { 
                    Authorization: `Bearer ${this.jwtToken}` 
                }
                
            });
        }
        
        return next.handle(req).pipe(tap((evt: HttpEvent<any>) => {
            if (evt instanceof HttpResponse) {
                // Récupérer le JWT dans l’entête d’authorization
                let tab : Array<String> ;
                let enteteAuthorization = evt.headers.get("Authorization");
                if (enteteAuthorization != null ) {
                    tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
                    if (tab.length > 1) {
                    this.jwtToken = tab[1]; }
                }
            }
        },
        (error: HttpErrorResponse) => {
            switch (error.status) {
                case 400:
                case 401:
                    this.router.navigate(['/']);
            }
            return of(null);
        }
        ));
    }*/
}