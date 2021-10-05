import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { Customer } from '../models/customer';

const URL = "http://localhost:8080/Customer"
@Injectable({
  providedIn: 'root'
})

export class CustomerService {

 
  
  // Http Headers
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

constructor(public http:HttpClient) { }
addCustomer(customer: Customer): Observable<Customer> {
  return this.http.post<Customer>(`${URL}`, customer, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
}
getAllCustomers() : Observable<Customer[]>{
  return this.http.get<Customer[]>(`${URL}`).pipe(retry(0),
  catchError(this.errorHandler)
  );
}
updateCustomer(customer: Customer): Observable<Customer> {
  return this.http.put<Customer>(URL, customer)
    .pipe(
      retry(0),
      catchError(this.errorHandler)
    )
}
getCustomerByPhoneNumber(PhoneNumber:any) : Observable<Customer>{
  return this.http.get<Customer>(`${URL}/mobno/${PhoneNumber}`)
}
getCustomerByEmail(Email:any) : Observable<Customer>{
  return this.http.get<Customer>(`${URL}/email/${Email}`)
}
forgetPassword(Email:any) : Observable<Customer>{
  return this.http.get<Customer>(`${URL}/forget/${Email}`)
}
getCustomerById(id:number) : Observable<Customer>{
  return this.http.get<Customer>(`${URL}/${id}`)
}
getCustomerByEmailAndPassword(email:string,password:string) : Observable<Customer>{
  return this.http.get<Customer>(`http://localhost:8080/login/${email}/${password}`)

}
deleteCustomerId(Id:number) : Observable<Customer>{
  return this.http.delete<Customer>(`${URL}/deletecus/${Id}`)
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
