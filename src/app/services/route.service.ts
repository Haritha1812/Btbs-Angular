import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Route } from '../models/route';

import { retry, catchError } from 'rxjs/operators';
const URL = "http://localhost:8080/route"
@Injectable({
  providedIn: 'root'
})
export class RouteService {
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
constructor(public http:HttpClient) { }

addRoute(route: Route): Observable<Route> {
  return this.http.post<Route>(`${URL}`, route, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
}

getRouteByLocation(fromLocation:String,toLocation:String) : Observable<Route[]>{
  return this.http.get<Route[]>(`${URL}/searchByfromTo/${fromLocation}/${toLocation}`).pipe(retry(0),
  catchError(this.errorHandler)
  );
}

getAllRoutes() : Observable<any>{
  return this.http.get<Route[]>(`${URL}`).pipe(retry(0),
  catchError(this.errorHandler)
  );
}

getRouteById(routeId:number) :Observable<Route>{
  return this.http.get<Route>(`${URL}/${routeId}`).pipe(retry(0),
  catchError(this.errorHandler));
}
updateroute(route: Route): Observable<Route> {
  return this.http.put<Route>(`${URL}`, route, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
}

deleteRoute(routeId:number) : Observable<Route>{
  return this.http.delete<Route>(`${URL}/deleteroute/${routeId}`)
}

getRouteByName(routeName:string):Observable<Route>{
  return this.http.get<Route>(`${URL}/routeName/${routeName}`).pipe(retry(0),
  catchError(this.errorHandler));
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


