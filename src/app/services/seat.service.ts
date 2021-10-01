import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Seat } from '../models/seat';


import { retry, catchError } from 'rxjs/operators';
import { Bus } from '../models/bus';
const URL = "http://localhost:8080/seat"
@Injectable({
  providedIn: 'root'
})
export class SeatService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(public http:HttpClient) { }

  addSeat(seat: Seat): Observable<Seat> {
    return this.http.post<Seat>(`${URL}`, seat, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }

  updateSeat(seat: Seat): Observable<Seat> {
    return this.http.put<Seat>(`${URL}`, seat, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  updateStatus(seatName: String,id:number): Observable<Seat> {
    return this.http.put<Seat>(`${URL}/status/${seatName}/${id}`,this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  getSeatById(id:number) : Observable<Seat>{
    return this.http.get<Seat>(`${URL}/${id}`).pipe(retry(0),
    catchError(this.errorHandler)
    );
  }

  getSeatByStaus(status:string) : Observable<Seat[]>{
    return this.http.get<Seat[]>(`${URL}/${status}`).pipe(retry(0),
    catchError(this.errorHandler)
    );
  }
  getseats(id:number) : Observable<Seat[]>{
    return this.http.get<Seat[]>(`${URL}/seats/${id}`).pipe(retry(0),
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
    case 200:    console.log("200's");

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
