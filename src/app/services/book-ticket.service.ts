import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';


import { retry, catchError } from 'rxjs/operators';
import { BookTicket } from '../models/book-ticket';

const URL = "http://localhost:8080/bookTicket"
@Injectable({
  providedIn: 'root'
})
export class BookTicketService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(public http: HttpClient) { }

  addTicket(bookTicket: BookTicket): Observable<BookTicket> {
    return this.http.post<BookTicket>(`${URL}`, bookTicket, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  getAllBookings(): Observable<any> {
    return this.http.get<BookTicket[]>(`${URL}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  getById(id: number): Observable<any> {
    return this.http.get<BookTicket>(`${URL}/${id}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  getByCusId(id: number): Observable<any> {
    return this.http.get<BookTicket>(`${URL}/cus/${id}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  getBybusId(id: number): Observable<any> {
    return this.http.get<BookTicket>(`${URL}/bus/${id}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  updateStatus(id: number, bid: number, cid: number): Observable<BookTicket> {
    return this.http.put<BookTicket>(`${URL}/status/${id}/${bid}/${cid}`, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  deleteticket(id: number): Observable<BookTicket> {
    return this.http.delete<BookTicket>(`${URL}/reject/${id}`)
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
