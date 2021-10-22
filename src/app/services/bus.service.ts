import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';


import { retry, catchError } from 'rxjs/operators';
import { Bus } from '../models/bus';
import { Route } from '../models/route';
const URL = "http://localhost:8080/bus"

@Injectable({
  providedIn: 'root'
})
export class BusService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(public http: HttpClient) { }

  addBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(`${URL}`, bus, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  getRouteByLocation(fromLocation: String, toLocation: String, date: string): Observable<any> {
    return this.http.get<Bus[]>(`${URL}/searchByfromTo/${fromLocation}/${toLocation}/${date}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  getBusById(busid: number): Observable<any> {
    return this.http.get<Bus>(`${URL}//${busid}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  getBusByName(name: string): Observable<any> {
    return this.http.get<Bus>(`${URL}/name/${name}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  updatebus(bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(`${URL}`, bus, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  updatebustimings(bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(`${URL}/timing`, bus, this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.errorHandler)
      )
  }
  deletebus(busId: number): Observable<Bus> {
    return this.http.delete<Bus>(`${URL}/deletebus/${busId}`)
  }
  getAllBuses(): Observable<any> {
    return this.http.get<Bus[]>(`${URL}`).pipe(retry(0),
      catchError(this.errorHandler)
    );
  }
  getBusTypes(): Observable<any> {
    return this.http.get<Bus[]>(`${URL}/bustype`).pipe(retry(0),
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
