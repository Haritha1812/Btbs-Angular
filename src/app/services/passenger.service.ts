import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { Passenger } from '../models/passenger';

const URL = "http://localhost:8080/Passenger"
@Injectable({
  providedIn: 'root'
})
export class PassengerService {


  constructor(public http: HttpClient) { }



  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addPassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(`${URL}`, passenger, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  getByBusidandcusid(busid: number, cusid: number): Observable<any> {
    return this.http.get<Passenger[]>(`${URL}/details/${busid}/${cusid}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  getBycusid(cusid: number): Observable<any> {
    return this.http.get<Passenger[]>(`${URL}/cus/${cusid}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side message
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    switch (error.status) {
      case 200: console.log("200's");

        break;
      case 401:
        break;
      case 403:
        break;
      case 0:
      case 400:
      case 405:
      case 406:
      case 409:
      case 500:
        break;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
