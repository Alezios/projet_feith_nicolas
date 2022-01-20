import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) {}

  public isAuth: boolean = false;

  public create(user: User): Observable<User> {

    return this.httpClient.post<User>(
      environment.apiUrl + 'users/',
      JSON.stringify(user),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(environment.apiUrl + 'users/me/');
  }

  public login(login: string, password: string): Observable<{access_token: string, token_type: string}> {
    let body = new URLSearchParams();
    body.set('username', login);
    body.set('password', password);

    return this.httpClient.post<{access_token: string, token_type: string}>(
      environment.apiUrl + 'token',
      body.toString(),
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError('Something bad happened; please try again later.');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error)
      return throwError(error.error);
    }
  }
}
